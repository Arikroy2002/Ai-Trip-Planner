import { Input } from "@/components/ui/input";
import{ useEffect, useState } from "react";
import { setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { doc } from "firebase/firestore";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetoption,
  SelectTravelesList,
} from "@/constants/Options";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChanges = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const navigate=useNavigate();
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => console.log(codeResp),
    onError: (error) => console.log(error),
  });
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const GetUserProfile = (tokenInfo) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo?.access_token}`,
              Accept: "Application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response?.data));
          setOpenDialog(false);
          onGenerateTrip();
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    };
    setLoading(true);
    if (
      (formData?.noOfDays > 10 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please Fill All Details");
      setOpenDialog(true);
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };
  return (
    <div className="container mt-5 mx-auto px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10">
      <h2 className="font-bold text-3xl text-center lg:text-left">
        Tell us your travel preferences 🏝️🎒
      </h2>
      <p className="mt-3 text-gray-500 text-xl text-center lg:text-left">
        Just provide some basic information, and we will plan the trip for you
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium text-center lg:text-left">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChanges("location", v);
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  display: "flex", // Flex layout
                  alignItems: "center", // Vertically centers the text
                  height: "2.5rem", // Tailwind's h-10 (height)
                  padding: "0 0.75rem", // Padding to ensure text is aligned properly
                  borderRadius: "0.375rem", // Tailwind's rounded-md
                  borderColor: state.isFocused ? "black" : "#d1d5db", // Thinner gray border by default, black on focus
                  borderWidth: state.isFocused ? "3px" : "1px", // Thicker border on focus, thin on blur
                  backgroundColor: "#ffffff", // White background
                  fontSize: "0.875rem", // Tailwind's text-sm
                  boxShadow: "none", // Remove the default shadow
                  "&:hover": {
                    borderColor: "black", // Keep black border on hover
                  },
                }),
                input: (provided) => ({
                  ...provided,
                  margin: "0", // Ensure no unwanted margins
                  padding: "0", // Ensure no unwanted padding
                  lineHeight: "1.5rem", // Adjust line-height to center the text vertically
                  color: "#000", // Text color
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#9ca3af", // Tailwind's placeholder:text-muted-foreground
                  lineHeight: "1.5rem", // Matches the input line height for proper vertical alignment
                }),
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium text-center lg:text-left">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.2"}
            type="number"
            onChange={(e) => handleInputChanges("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium text-center lg:text-left">
            What's Your Budget?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetoption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChanges("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.budget == item.title && "Shadow-lg border-black"}
                  `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium text-center lg:text-left">
            Who Will Accompany You on Your Next Travel Adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChanges("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.traveler == item.people &&
                    "Shadow-lg border-black"
                  }
                  `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication Securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                {" "}
                <FcGoogle className="h-7 w-7" /> Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
