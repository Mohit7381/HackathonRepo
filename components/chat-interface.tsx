"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Upload, Camera, Loader2, Flag } from "lucide-react";
import NutritionDisplay from "@/components/nutrition-display";
import { POST } from "@/app/api/chat/route";

interface ChatInterfaceProps {
  onBack: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [uploading, setUploading] = useState(false);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const { messages, append, handleInputChange, isLoading } =
    useChat();
  const [input, setInput] = useState(" ");

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true)
    const formData = new FormData();
    formData.append("user_id", "user69"); // you can replace this dynamically if needed
    formData.append("message", input);

    try {
      const response = await fetch("http://localhost:8000/chat-meal-coach/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Message sent:", result);

      // Optionally parse and update UI
      if (result?.reply) {
        await append({ role: "user", content: input });
        await append({ role: "assistant", content: result.reply });
      }

      // Optionally parse nutrition info if embedded in JSON blocks
      const jsonMatch = result.reply?.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        setNutritionData(parsed);
      }

      setInput(""); // clear input
      setUploading(false)
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", "user69");
      formData.append("height", "175");
      formData.append("weight", "69");

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Upload success:", result);

        const rawJsonBlock = result?.detected_food_items?.[0] || "";
        const match = rawJsonBlock.match(/```json\n([\s\S]*?)\n```/);

        if (match) {
          const parsedJson = JSON.parse(match[1]);

          const foods = parsedJson.food_items.join(", ");
          const summary = parsedJson.summary;
          const suggestions = parsedJson.diet_suggestions.join(", ");
          setUploading(false);
          const message = `🍽️ **Detected Food Items:** ${foods}\n\n📊 **Summary:** ${summary}\n\n💡 **Suggestions:** ${suggestions}`;

          // ✅ This adds the message to chat
          await append({
            role: "user",
            content: message,
          });
        } else {
          console.warn("⚠️ No valid JSON block found in detected_food_items");
        }
      } catch (error) {
        console.error("❌ Image upload failed:", error);
      }
    }
  };
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-full mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-lg font-bold text-red-600">
                Nutrition Assistant
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-full mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-1">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col border-red-100">
              <CardHeader className="bg-red-50 border-b border-red-100">
                <CardTitle className="text-red-600 flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Meal Analysis Chat
                </CardTitle>
              </CardHeader>
              <CardContent className=" overflow-scroll flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Upload Your Meal
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Take a photo or describe your meal to get nutritional
                        analysis
                      </p>
                      <div className="flex justify-center space-x-4">
                        <label className="relative cursor-pointer inline-block">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 pointer-events-none"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Upload Photo
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.content}
                      </div>
                     
                    </div>
                  ))}
                   <div ref={bottomRef} />
                  {(isLoading || uploading) && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Analyzing your meal...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-red-100 p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      placeholder="Describe your meal or ask about nutrition..."
                      className="flex-1 border-red-200 focus:border-red-400"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
