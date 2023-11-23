import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { deletePublications } from "@/services/PublicationsService";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const showPublicationColor = ({ row }) => {
    const totalMember = row.original.rcCenter.totalMembers;
    const benchMarks = row.original.publicationsType.benchmarksNo;
    const avg = Math.ceil(totalMember * benchMarks);
    let colorClass = "text-red-600 font-semibold bg-[#ffcdd2] px-8 py-2 rounded-xl";
    if (avg === row.original.publicationsNo) {
        colorClass = "text-yellow-600 font-semibold bg-[#fff9c4] px-8 py-2 rounded-xl";
    } else if (row.original.publicationsNo > avg) {
        colorClass = "text-green-600 font-semibold bg-[#c8e6c9] px-8 py-2 rounded-xl";
    }
    return <span className={colorClass}>{row.original.publicationsNo}</span>;
}

export const CellComponent = ({ row }) => {
    let navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        deletePublications(row.original.publicationsId).then((response) => {
            console.log(response.data)
            if (response.data.status) {
                navigate('/ceo-dashboard/publications');
            }
        }).catch(error => {
            console.log(error)
        })
    };
    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 bg-gray-800 text-white border border-gray-500">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800">
                        <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                        <Link to={`/ceo-dashboard/publications/manage/${row.original.publicationsId}`}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-blue-500 text-white hover:bg-white-600 border border-gray-500">
                                    View
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link to={`/ceo-dashboard/publications/manage/${row.original.publicationsId}/?updatecall=true`} state={{ 'updatecall': true }}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-green-800 text-white border hover:bg-white-600 border-gray-500">
                                    Edit
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="h-8 w-full bg-red-800 text-white border hover:bg-white-600 border-gray-500" onClick={() => setIsDialogOpen(true)}>
                                    Remove
                                </Button>
                            </DialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {isDialogOpen && (
                        //<Dialog>
                        <DialogContent className="sm:max-w-[425px] bg-slate-600">
                            <DialogHeader>
                                <DialogTitle className="text-red-800 text-2xl font-bold">Confirm!</DialogTitle>
                                <DropdownMenuSeparator />
                                <DialogTitle className="text-white text-2xl">Are you sure?</DialogTitle>
                                <DialogDescription className="text-white">
                                    This action will delete this rc center permanentely.
                                </DialogDescription>
                            </DialogHeader>
                            <DropdownMenuSeparator className="text-gray-800" />
                            <DialogFooter>
                                <Button type="button" className="text-white bg-red-500 hover:bg-red-600" onClick={handleDelete}>Yes</Button>
                                <Button type="button" onClick={() => setIsDialogOpen(false)}>No</Button>
                            </DialogFooter>
                        </DialogContent>
                        //</Dialog>
                    )}
                </DropdownMenu>
            </Dialog>
        </>
    )
}

const columnHelper = createColumnHelper();
export const columns = [

    columnHelper.accessor("", {
        accessorKey: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
    }),
    // {
    //     accessorFn: row => {
    //         console.log(row);
    //         let totalMember = row.rcCenter.totalMembers;
    //         let benchMarks = row.publicationsType.benchmarksNo;
    //         let avg = Math.ceil(totalMember * benchMarks);
    //         if (avg === row.publicationsNo) {
    //             return <span className="text-yellow-600">{row.publicationsNo}</span>;
    //         } else if (row.publicationsNo > avg) {
    //             return <span className="text-green-600">{row.publicationsNo}</span>;
    //         } else {
    //             return <span className="text-red-600">{row.publicationsNo}</span>;
    //         }
    //     },
    //     header: "Publications No",
    // },
    {
        id: "Publications No",
        enableHiding: false,
        cell: showPublicationColor,
        // cell: ({ row }) => {

        //     return (
        //         <>
        //             {row.publicationsNo}
        //         </>
        //     )
        //             // console.log(row);
        // let totalMember = row.rcCenter.totalMembers;
        // let benchMarks = row.publicationsType.benchmarksNo;
        // let avg = Math.ceil(totalMember * benchMarks);
        // if (avg === row.publicationsNo) {
        //     return <span className="text-yellow-600">{row.publicationsNo}</span>;
        // } else if (row.publicationsNo > avg) {
        //     return <span className="text-green-600">{row.publicationsNo}</span>;
        // } else {
        //     return <span className="text-red-600">{row.publicationsNo}</span>;
        // }
        //         },
        header: "Publications No",
    },
    {
        accessorFn: row => row.publicationsType.publicationsName,
        header: "Publications Type",
    },
    {
        accessorFn: row => row.rcCenter.rcCenterName,
        header: "Rc Center"
    },
    {
        id: "actions",
        enableHiding: false,
        cell: CellComponent
    },
]