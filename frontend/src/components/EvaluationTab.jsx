import { useState } from 'react'
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog"
import { Input } from "./ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"

export default function EvaluationTab() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState('all')
  const [selectedRow, setSelectedRow] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/evaluate', formData)
      setResults(response.data)
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    }
    setLoading(false)
  }

  const filteredData = results?.data?.filter(row => {
    if (!searchTerm) return true
    
    if (filterField === 'all') {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return String(row[filterField])
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  })

  const handleRowClick = (row) => {
    setSelectedRow(row)
    setIsDialogOpen(true)
  }

  return (
    <div className="border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow sm:rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Evaluation Dataset (CSV)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    dark:file:bg-indigo-900 dark:file:text-indigo-300
                    hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            {loading ? 'Processing...' : 'Evaluate Data'}
          </button>
        </div>
      </form>
      
      {results && !results.error && (
        <div className="mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Evaluation Results</h3>
            
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Select value={filterField} onValueChange={setFilterField}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Filter by field" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">All Fields</SelectItem>
                  {(results.data && results.data.length > 0 && results.data[0]) && Object.keys(results.data[0]).map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {(results.data && results.data.length > 0 && results.data[0]) && Object.keys(results.data[0]).map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredData.map((row, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => handleRowClick(row)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {Object.values(row).map((value, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-6 py-4 whitespace-nowrap text-sm`}
                        >
                          {Object.keys(row)[cellIdx] === 'prediction' ? (
                            <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                              value === 'Good'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {value}
                            </span>
                          ) : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 rounded-md bg-red-50 dark:bg-red-900">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-700">
          <DialogHeader>
            <DialogTitle>Credit Data Details</DialogTitle>
          </DialogHeader>
          {selectedRow && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {key}
                  </p>
                  <p className={`text-base ${
                    key === 'prediction'
                      ? value === 'Good'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
