"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Calendar, TrendingUp, Target } from "lucide-react"

interface ReportsViewProps {
  onBack: () => void
}

export default function ReportsView({ onBack }: ReportsViewProps) {
  const [reportType, setReportType] = useState<"weekly" | "monthly">("weekly")

  const weeklyData = {
    totalCalories: 14530,
    avgCalories: 2071,
    protein: 420,
    carbs: 1800,
    fat: 580,
    meals: 21,
    goals: {
      calories: 85,
      protein: 92,
      carbs: 50,
      fat: 88,
    },
  }

  const monthlyData = {
    totalCalories: 62000,
    avgCalories: 2000,
    protein: 1800,
    carbs: 7800,
    fat: 2400,
    meals: 90,
    goals: {
      calories: 88,
      protein: 50,
      carbs: 82,
      fat: 90,
    },
  }

  const currentData = reportType === "weekly" ? weeklyData : monthlyData

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">\
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-lg font-bold text-red-600">Nutrition Reports</h1>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={reportType} onValueChange={(value) => setReportType(value as "weekly" | "monthly")}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="weekly" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Weekly Report
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Monthly Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <ReportContent data={currentData} period="This Week" />
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <ReportContent data={currentData} period="This Month" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ReportContent({ data, period }: { data: any; period: string }) {
  return (
    <>
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calories</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalCalories.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Daily Calories</p>
                <p className="text-2xl font-bold text-gray-900">{data.avgCalories}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Meals Tracked</p>
                <p className="text-2xl font-bold text-gray-900">{data.meals}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goal Achievement</p>
                <p className="text-2xl font-bold text-red-600">
                  {Math.round((data.goals.calories + data.goals.protein + data.goals.carbs + data.goals.fat) / 4)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-red-100">
          <CardHeader className="bg-red-50 border-b border-red-100">
            <CardTitle className="text-red-600">Macronutrient Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Protein</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{data.protein}g</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-600 rounded-full" style={{ width: `${data.goals.protein}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{data.goals.protein}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Carbohydrates</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{data.carbs}g</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-600 rounded-full" style={{ width: `${data.goals.carbs}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{data.goals.carbs}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Fat</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{data.fat}g</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-600 rounded-full" style={{ width: `${data.goals.fat}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{data.goals.fat}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader className="bg-red-50 border-b border-red-100">
            <CardTitle className="text-red-600">Health Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Great Progress!</h4>
                <p className="text-sm text-green-700">You're meeting your protein goals consistently.</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Room for Improvement</h4>
                <p className="text-sm text-yellow-700">Consider adding more vegetables to increase fiber intake.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                <p className="text-sm text-blue-700">Try to maintain consistent meal timing for better metabolism.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
