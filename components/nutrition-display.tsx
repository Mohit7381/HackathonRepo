"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flame, Zap, Droplets, Apple } from "lucide-react"

interface NutritionDisplayProps {
  data: any
}

export default function NutritionDisplay({ data }: NutritionDisplayProps) {
  if (!data) {
    return (
      <Card className="border-red-100">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <CardTitle className="text-red-600 flex items-center">
            <Apple className="h-5 w-5 mr-2" />
            Nutrition Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Apple className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-gray-600">Upload a meal to see nutritional analysis</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { calories, macros, vitamins, minerals, meal_name } = data

  return (
    <Card className="border-red-100">
      <CardHeader className="bg-red-50 border-b border-red-100">
        <CardTitle className="text-red-600 flex items-center">
          <Apple className="h-5 w-5 mr-2" />
          Nutrition Facts
        </CardTitle>
        {meal_name && (
          <Badge variant="secondary" className="w-fit bg-red-100 text-red-700">
            {meal_name}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Calories */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">{calories}</span>
            <span className="text-gray-600 ml-1">kcal</span>
          </div>
        </div>

        {/* Macros */}
        {macros && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Zap className="h-4 w-4 text-red-600 mr-2" />
              Macronutrients
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Protein</span>
                  <span>{macros.protein}g</span>
                </div>
                <Progress value={(macros.protein / 50) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Carbs</span>
                  <span>{macros.carbs}g</span>
                </div>
                <Progress value={(macros.carbs / 300) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fat</span>
                  <span>{macros.fat}g</span>
                </div>
                <Progress value={(macros.fat / 65) * 100} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Vitamins & Minerals */}
        {(vitamins || minerals) && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <Droplets className="h-4 w-4 text-red-600 mr-2" />
              Key Nutrients
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {vitamins &&
                Object.entries(vitamins).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="ml-1 font-medium">{value as string}</span>
                  </div>
                ))}
              {minerals &&
                Object.entries(minerals).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="ml-1 font-medium">{value as string}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
