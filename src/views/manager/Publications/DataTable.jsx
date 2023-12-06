import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import PropTypes from 'prop-types';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Debounced from "@/utils/Debounced";

export default function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = useState(
        []
    )

    const [globalFilter, setGlobalFilter] = useState("");

    const [{ pageIndex, pageSize }, setPagination] =
        useState({
            pageIndex: 0,
            pageSize: 10,
        })
    const [sorting, setSorting] = useState([])

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            sorting,
            columnFilters,
            globalFilter,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    })

    return (
        <div>
            <div className="flex items-center py-4 px-2 rounded-full">
                {/* Search for all the data */}
                <Debounced value={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))}
                    placeholder="Filter all..."
                />
            </div>
            <div className="rounded-md border bg-slate-300">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-white bg-gray-800">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${i % 2 === 0 ? "bg-muted/5" : ''}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-2">
                    <span className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm">Page <strong> {table.getState().pagination.pageIndex + 1} </strong> of <strong> {table.getPageCount()} </strong> </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        First
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        Last
                    </Button>
                    <Select onValueChange={(value) => table.setPageSize(Number(value))} name="role" id="role" className="inline-block px-4 py-2 text-white hover:text-white duration-150 font-medium bg-gray-800 rounded-full hover:bg-gray-500 active:bg-gray-700 md:text-sm outline-none" value={table.getState().pagination.pageSize}>
                        <SelectTrigger className="focus:outline-none outline-none bg-gray-800 h-9 text-white rounded-full">
                            <SelectValue placeholder="Show Page" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white rounded-xl" >
                            <SelectGroup>
                                <SelectLabel>Show Page</SelectLabel>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem value={pageSize} key={pageSize}>Show {pageSize}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};