import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { MODEL_OPTIONS, getSelectedModel, setSelectedModel } from '../utils/modelStorage'

export default function ModelSelector({ onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Select Model
      </label>
      <Select
        defaultValue={getSelectedModel()}
        onValueChange={(value) => {
          setSelectedModel(value);
          if (onChange) onChange(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 max-h-[200px] overflow-y-auto">
          {Object.entries(MODEL_OPTIONS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 