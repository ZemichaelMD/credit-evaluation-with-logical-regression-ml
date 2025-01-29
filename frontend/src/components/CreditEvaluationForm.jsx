import { useState } from 'react'
import axios from 'axios'
import columnOptions from './columnOptions'
import { Input } from "./ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Label } from "./ui/Label"
import { ChartBarStacked } from 'lucide-react'
import { cn } from '../utils/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog"
import ModelSelector from './ModelSelector'
import { getSelectedModel } from '../utils/modelStorage'

export default function CreditEvaluationForm() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState(null)

  const handleInputChange = (columnId, value) => {
    setFormData(prev => ({
      ...prev,
      [columnId]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setFieldErrors({})
    try {
      const response = await axios.post('http://localhost:8000/evaluate-credit', {
        ...formData,
        model_key: getSelectedModel()
      })

      if (response.data.success) {
        setEvaluationResult({
          prediction: response.data.predictions[0],
          ...response.data.data[0]
        })
        setIsDialogOpen(true)
      } else {
        setError(response.data.message || 'Evaluation failed')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ModelSelector />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {columnOptions.map((column) => (
            <div key={column.id} className="space-y-2">
              <Label 
                htmlFor={column.id}
                className="text-sm font-medium"
                title={column.description}
              >
                {column.name}
              </Label>

              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {column.description}
              </p>
              
              {column.type === 'select' ? (
                <>
                  <Select
                    value={formData[column.id] || ''}
                    onValueChange={(value) => handleInputChange(column.id, value)}
                  >
                    <SelectTrigger id={column.id} className={cn(fieldErrors[column.id] && "border-red-500 dark:border-red-500")}>
                      <SelectValue placeholder={`Select ${column.name}`} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto bg-white dark:bg-gray-800">
                      {column.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors[column.id] && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors[column.id]}</p>
                  )}
                </>
              ) : (
                <>
                  <Input
                    id={column.id}
                    type="number"
                    {...(column.min && column.max ? { min: column.min, max: column.max } : {})}
                    value={formData[column.id] || ''}
                    onChange={(e) => handleInputChange(column.id, e.target.value)}
                    placeholder={`Enter ${column.name}`}
                  />
                  {fieldErrors[column.id] && (
                    <p className="text-sm text-red-500 mt-1">{fieldErrors[column.id]}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="p-4 rounded-md bg-red-50 dark:bg-red-900">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <Button 
          variant="outline"
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          <ChartBarStacked className="w-4 h-4" />
          {loading ? 'Processing...' : 'Evaluate Credit'}
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-700">
          <DialogHeader>
            <DialogTitle>Credit Evaluation Result</DialogTitle>
          </DialogHeader>
          {evaluationResult && (
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg border-2 border-dashed">
                <p className="text-lg font-semibold mb-2">Prediction</p>
                <p className={`text-3xl font-bold ${
                  evaluationResult.prediction === 'Good'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {evaluationResult.prediction}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(evaluationResult).map(([key, value]) => (
                  key !== 'prediction' && (
                    <div key={key} className="space-y-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-base text-gray-900 dark:text-gray-100">
                        {value?.toString()}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
