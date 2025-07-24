"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, MessageCircle, BarChart3, Calendar, Utensils } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import ReportsView from "@/components/reports-view"
import MealPlanView from "@/components/meal-plan-view"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "chat" | "reports" | "meal-plan">("home")

  const renderView = () => {
    switch (currentView) {
      case "chat":
        return <ChatInterface onBack={() => setCurrentView("home")} />
      case "reports":
        return <ReportsView onBack={() => setCurrentView("home")} />
      case "meal-plan":
        return <MealPlanView onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-red-100">
              <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FH</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-red-600">Fit Sense AI</h1>
                    <p className="text-sm text-gray-600">Nutrition Tracker</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Nutrition with AI</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Upload your meals, get instant nutritional analysis, and plan healthier eating habits with our
                  AI-powered assistant.
                </p>

                {/* Primary CTA */}
                <Button
                  onClick={() => setCurrentView("chat")}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Upload className="mr-3 h-6 w-6" />
                  Upload Your Meal
                </Button>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card
                  className="border-red-100 hover:border-red-200 transition-colors cursor-pointer hover:shadow-lg"
                  onClick={() => setCurrentView("chat")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Chat Analysis</h3>
                    <p className="text-gray-600">
                      Upload photos or describe your meals for instant nutritional breakdown
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="border-red-100 hover:border-red-200 transition-colors cursor-pointer hover:shadow-lg"
                  onClick={() => setCurrentView("reports")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Reports</h3>
                    <p className="text-gray-600">Generate weekly and monthly nutrition reports automatically</p>
                  </CardContent>
                </Card>

                <Card
                  className="border-red-100 hover:border-red-200 transition-colors cursor-pointer hover:shadow-lg"
                  onClick={() => setCurrentView("meal-plan")}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Meal Planning</h3>
                    <p className="text-gray-600">Get personalized breakfast, lunch, and dinner recommendations</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => setCurrentView("reports")}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 p-6 h-auto flex-col space-y-2"
                  >
                    <BarChart3 className="h-8 w-8" />
                    <span className="text-lg">View Reports</span>
                  </Button>
                  <Button
                    onClick={() => setCurrentView("meal-plan")}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 p-6 h-auto flex-col space-y-2"
                  >
                    <Utensils className="h-8 w-8" />
                    <span className="text-lg">Plan Meals</span>
                  </Button>
                </div>
              </div>
            </main>
          </div>
        )
    }
  }

  return renderView()
}
