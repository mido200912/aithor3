import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { companyService } from '../services/api';
import "./CompanyDashboard.css";

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [prompt, setPrompt] = useState("Write an attractive description for my company");

  const token = localStorage.getItem("token");
  const API_URL = (process.env.REACT_APP_API_URL || "https://aithor-vbyydstn.b4a.run/api") + "/company";

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompany(res.data.company || res.data); // لو البيانات داخل key company
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(company.apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleTestAI = async () => {
    if (!company?.apiKey) return alert("API Key not found");
    try {
      // استخدم publicCompanyService.sendAiMessage بدل chatService
     // في companyService
sendAiMessage: async (apiKey, prompt) => {
  const response = await api.post("/company/use-model", { apiKey, prompt });
  return response.data.reply;
},

      setAiResponse(reply);
    } catch (err) {
      console.error("AI error:", err);
      setAiResponse("An error occurred while connecting to AI");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!company) return <div className="text-center mt-10">Company not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Dashboard
      </motion.h1>

      {/* Company Info */}
      <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
        <p className="text-gray-600 mb-4">{company.description}</p>
        <div className="mb-2"><strong>Industry:</strong> {company.industry || "Not specified"}</div>
        <div className="mb-2"><strong>Vision:</strong> {company.vision || "Not specified"}</div>
        <div className="mb-2"><strong>Mission:</strong> {company.mission || "Not specified"}</div>
      </motion.div>

      {/* API Key */}
      <motion.div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-2xl flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <h3 className="font-semibold text-blue-600 dark:text-blue-300">AI API Key</h3>
          <p className="text-sm break-all">{company.apiKey}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Copy
        </button>
      </motion.div>

      {copySuccess && (
        <motion.div className="text-green-600 text-center mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          API Key copied ✅
        </motion.div>
      )}

      {/* Test AI */}
      <motion.div className="bg-gray-100 dark:bg-gray-800 mt-8 p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-3">Test the AI</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={handleTestAI}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-3"
        >
          Send
        </button>

        {aiResponse && (
          <motion.div
            className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-xl text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {aiResponse}
          </motion.div>
        )}
      </motion.div>

      {/* API Usage Instructions */}
      <motion.div className="bg-gray-100 dark:bg-gray-800 mt-8 p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-3">How to Use the API</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`POST https://aithor-vbyydstn.b4a.run/api/public-company-chat/chat
Content-Type: application/json

{
  "companyApiKey": "${company.apiKey}",
  "prompt": "Write an attractive description for my company"
}`}
        </pre>
      </motion.div>
    </div>
  );
}
