"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, ChefHat, Utensils, Coffee, Sun, Moon } from "lucide-react"

interface MealPlanViewProps {
  onBack: () => void
}

export default function MealPlanView({ onBack }: MealPlanViewProps) {
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner">("breakfast")

  const mealPlans = {
    breakfast: [
      {
        name: "Protein Power Bowl",
        calories: 420,
        time: "15 min",
        difficulty: "Easy",
        ingredients: ["Greek yogurt", "Berries", "Granola", "Honey", "Chia seeds"],
        macros: { protein: 25, carbs: 45, fat: 12 },
      },
      {
        name: "Avocado Toast Supreme",
        calories: 380,
        time: "10 min",
        difficulty: "Easy",
        ingredients: ["Whole grain bread", "Avocado", "Eggs", "Tomato", "Feta cheese"],
        macros: { protein: 18, carbs: 35, fat: 22 },
      },
      {
        name: "Green Smoothie Bowl",
        calories: 350,
        time: "8 min",
        difficulty: "Easy",
        ingredients: ["Spinach", "Banana", "Mango", "Coconut milk", "Almonds"],
        macros: { protein: 12, carbs: 55, fat: 15 },
      },
    ],
    lunch: [
      {
        name: "Mediterranean Quinoa Salad",
        calories: 520,
        time: "20 min",
        difficulty: "Medium",
        ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Feta", "Olive oil"],
        macros: { protein: 22, carbs: 65, fat: 18 },
      },
      {
        name: "Grilled Chicken Wrap",
        calories: 480,
        time: "15 min",
        difficulty: "Easy",
        ingredients: ["Chicken breast", "Whole wheat tortilla", "Lettuce", "Tomato", "Hummus"],
        macros: { protein: 35, carbs: 42, fat: 16 },
      },
      {
        name: "Asian Buddha Bowl",
        calories: 450,
        time: "25 min",
        difficulty: "Medium",
        ingredients: ["Brown rice", "Tofu", "Edamame", "Carrots", "Sesame dressing"],
        macros: { protein: 20, carbs: 58, fat: 14 },
      },
    ],
    dinner: [
      {
        name: "Salmon with Roasted Vegetables",
        calories: 580,
        time: "30 min",
        difficulty: "Medium",
        ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Herbs"],
        macros: { protein: 42, carbs: 35, fat: 28 },
      },
      {
        name: "Lean Beef Stir-fry",
        calories: 520,
        time: "20 min",
        difficulty: "Easy",
        ingredients: ["Lean beef", "Mixed vegetables", "Brown rice", "Soy sauce", "Ginger"],
        macros: { protein: 38, carbs: 45, fat: 18 },
      },
      {
        name: "Vegetarian Pasta Primavera",
        calories: 480,
        time: "25 min",
        difficulty: "Medium",
        ingredients: ["Whole wheat pasta", "Zucchini", "Bell peppers", "Parmesan", "Basil"],
        macros: { protein: 18, carbs: 72, fat: 14 },
      },
    ],
  }

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return <Coffee className="h-5 w-5" />
      case "lunch":
        return <Sun className="h-5 w-5" />
      case "dinner":
        return <Moon className="h-5 w-5" />
      default:
        return <Utensils className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
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
              <h1 className="text-lg font-bold text-red-600">Meal Planning</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Personalized Meal Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-curated meal suggestions based on your nutritional goals and preferences
          </p>
        </div>

        <Tabs value={selectedMeal} onValueChange={(value) => setSelectedMeal(value as any)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="breakfast" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Coffee className="h-4 w-4 mr-2" />
              Breakfast
            </TabsTrigger>
            <TabsTrigger value="lunch" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Sun className="h-4 w-4 mr-2" />
              Lunch
            </TabsTrigger>
            <TabsTrigger value="dinner" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Moon className="h-4 w-4 mr-2" />
              Dinner
            </TabsTrigger>
          </TabsList>

          {(["breakfast", "lunch", "dinner"] as const).map((mealType) => (
            <TabsContent key={mealType} value={mealType}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mealPlans[mealType].map((meal, index) => (
                  <Card key={index} className="border-red-100 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getMealIcon(mealType)}
                          <CardTitle className="text-lg text-gray-900">{meal.name}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          {meal.calories} cal
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Quick Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {meal.time}
                        </div>
                        <div className="flex items-center">
                          <ChefHat className="h-4 w-4 mr-1" />
                          {meal.difficulty}
                        </div>
                      </div>

                      {/* Macros */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-red-50 rounded-lg p-2">
                          <div className="text-sm font-semibold text-red-600">{meal.macros.protein}g</div>
                          <div className="text-xs text-gray-600">Protein</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-2">
                          <div className="text-sm font-semibold text-red-600">{meal.macros.carbs}g</div>
                          <div className="text-xs text-gray-600">Carbs</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-2">
                          <div className="text-sm font-semibold text-red-600">{meal.macros.fat}g</div>
                          <div className="text-xs text-gray-600">Fat</div>
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                          {meal.ingredients.slice(0, 3).map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-red-200 text-red-700">
                              {ingredient}
                            </Badge>
                          ))}
                          {meal.ingredients.length > 3 && (
                            <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                              +{meal.ingredients.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Utensils className="h-4 w-4 mr-2" />
                        Add to Meal Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Weekly Meal Plan Preview */}
        <Card className="mt-12 border-red-100">
          <CardHeader className="bg-red-50 border-b border-red-100">
            <CardTitle className="text-red-600 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              This Week's Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="font-semibold text-gray-900 mb-2">{day}</div>
                  <div className="space-y-1">
                    <div className="text-xs bg-orange-100 text-orange-700 rounded px-2 py-1">
                      B: {mealPlans.breakfast[index % 3].name.split(" ")[0]}
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-700 rounded px-2 py-1">
                      L: {mealPlans.lunch[index % 3].name.split(" ")[0]}
                    </div>
                    <div className="text-xs bg-purple-100 text-purple-700 rounded px-2 py-1">
                      D: {mealPlans.dinner[index % 3].name.split(" ")[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
