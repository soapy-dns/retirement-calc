"use client"
import React from "react"

const SheetPage: React.FC = () => {
  // h-screen is fine if we want to use the entire screen
  return (
    <div className="flex flex-col h-screen border-2 border-green-700 pb-20">
      <div className="flex-grow overflow-auto">
        <table className="relative w-full border-2 border-red-500">
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Header</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-red-100">
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Header</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-green-100">
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Header</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-blue-100">
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-yellow-900 bg-yellow-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-yellow-900 bg-yellow-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-yellow-900 bg-yellow-300">Header</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-yellow-100">
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-purple-900 bg-purple-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-purple-900 bg-purple-300">Header</th>
              <th className="sticky top-0 px-6 py-3 text-purple-900 bg-purple-300">Header</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-purple-100">
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
              <td className="px-6 py-4 text-center">Column</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SheetPage
