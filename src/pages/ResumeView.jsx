import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import resumeBuilderSurvice from "../Services/resume.services.js";
import { ResumePreview } from "../components/index.js";

function ResumeView() {
  const { username: paramUsername } = useParams();
  const currentUser = useSelector((state) => state.AuthReducer?.data);

  const username =
    paramUsername ||
    currentUser?.username ||
    currentUser?.user?.username ||
    "ayush";

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      if (!username) {
        setLoading(false);
        setError("No username provided");
        return;
      }
      try {
        const response = await resumeBuilderSurvice.ReadResume(username);
        if (response?.data) {
          setResume(response.data);
        } else {
          setError("No resume found for this user.");
        }
      } catch (err) {
        setError("Failed to load resume.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-slate-50 dark:bg-[#040405] transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-primary-500 dark:border-primary-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-slate-50 dark:bg-[#040405] transition-colors duration-300">
        <div className="text-center text-slate-600 dark:text-slate-400 font-bold tracking-wide">
          {error}
        </div>
      </div>
    );
  }

  return <ResumePreview resumeData={resume} />;
}

export default ResumeView;
