import { useState } from 'react'
import axios from 'axios'

export default function TrainingTab() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [results, setResults] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/train', formData)
      setResults(response.data)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred')
    }
    setLoading(false)
  }

  return (
    <div className="border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow sm:rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Training Dataset (CSV)
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
            {loading ? 'Training...' : 'Train Model'}
          </button>
        </div>
      </form>

      {/* {results && !results.error && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Results</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Accuracy: {(results.accuracy * 100).toFixed(2)}%</p>
            
            <h4 className="mt-4 font-medium text-gray-900 dark:text-gray-100">Confusion Matrix</h4>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {results.confusion_matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="mt-4 font-medium text-gray-900 dark:text-gray-100">Classification Report</h4>
            <pre className="mt-2 text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
              {results.classification_report}
            </pre>
          </div>
        </div>
      )} */}
      
      {results?.error && (
        <div className="mt-4 p-4 rounded-md bg-red-50 dark:bg-red-900">
          <p className="text-sm text-red-700 dark:text-red-200">{results.error}</p>
        </div>
      )}
      
      {message && (
        <div className="mt-4 p-4 rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
      )}
    </div>
  )
}
