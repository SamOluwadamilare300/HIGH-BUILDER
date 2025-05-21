"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<T> {
  data: T[]
  columns: {
    header: string
    accessorKey: keyof T
    cell?: (item: T) => React.ReactNode
  }[]
  title?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  pagination?: boolean
  itemsPerPage?: number
}

export function DataTable<T>({
  data,
  columns,
  title = "Data Table",
  searchPlaceholder = "Search...",
  onSearch,
  pagination = true,
  itemsPerPage = 5,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  // Simple client-side filtering if no onSearch provided
  const filteredData = onSearch 
    ? data 
    : data.filter((item: any) => 
        Object.values(item).some((value: any) => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = pagination 
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData

  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              {columns.map((column, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-500"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-700"
                    >
                      {column.cell 
                        ? column.cell(item) 
                        : String(item[column.accessorKey] || "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredData.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
            {Math.min(filteredData.length, currentPage * itemsPerPage)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
