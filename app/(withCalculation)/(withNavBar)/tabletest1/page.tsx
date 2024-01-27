"use client"
import { useSearchParams } from "next/navigation"
import React, { useContext, useState } from "react"

const EmptyLine = () => {
  return (
    <tr>
      <td>&nbsp;</td>
    </tr>
  )
}

const SheetPage: React.FC = () => {
  return (
    <div className="w-screen">
      <div className="inline-block min-w-full">
        <table className="table-fixed bg-white">
          <thead className="sticky top-20 z-30 bg-gray-100">
            <tr>
              <th className="sticky left-0 bg-gray-100" scope="col">
                corner
              </th>
              <th>heading 2</th>
              <th>heading 3</th>
              <th>heading 4</th>
              <th>heading 5</th>
              <th>heading 6</th>
              <th>heading 7</th>
              <th>heading 8</th>
              <th>heading 9</th>
              <th>heading 10</th>
              <th>heading 11</th>
              <th>heading 12</th>
              <th>heading 13</th>
              <th>heading 14</th>
              <th>heading 15</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            <tr>
              <th scope="row" className="sticky left-0 bg-gray-100">
                row header1a1a1a
              </th>
              <td className="">cell 1</td>
              <td>cell 2</td>
              <td>cell 3</td>
              <td>cell 4</td>
              <td>cell 5</td>
              <td>cell 6</td>
              <td>cell 7</td>
              <td>cell 8</td>
              <td>cell 9</td>
              <td>cell 10</td>
              <td>cell 11</td>
              <td>cell 12</td>
              <td>cell 13</td>
              <td>cell 14</td>
            </tr>

            <tr>
              <th scope="row" className="sticky left-0 bg-gray-100">
                row header1b
              </th>
              <td className="divide-x-2 divide-green-700">cell 1</td>
              <td>cell 2</td>
              <td>cell 3</td>
              <td>cell 4</td>
              <td>cell 5</td>
              <td>cell 6</td>
              <td>cell 7</td>
              <td>cell 8</td>
              <td>cell 9</td>
              <td>cell 10</td>
              <td>cell 11</td>
              <td>cell 12</td>
              <td>cell 13</td>
              <td>cell 14</td>
            </tr>

            <tr>
              <td>row header2</td>
              <td className="divide-x-2 divide-green-700">cell 1</td>
              <td>cell 2</td>
            </tr>

            <tr>
              <td>row header3</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header4</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header5</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header6</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header7</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header8</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header9</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header10</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header11</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header12</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
            <tr>
              <td>row header13</td>
              <td>cell 1</td>
              <td>cell 2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SheetPage
