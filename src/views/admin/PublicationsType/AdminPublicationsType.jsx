import { useEffect, useState } from 'react'
import { columns } from './Columans';
import DataTable from './DataTable';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { addPublicationsType, publicationsTypeLists, updatePublicationsType } from '@/services/PublicationsType';
import toast, { Toaster } from 'react-hot-toast';

const AdminPublicationsType = (props) => {

    const [publicationsTypes, setPublicationsTypes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [publicationsType, setPublicationsType] = useState({
        "publicationsName": "",
        "benchmarksNo": 0
    });

     //publications types list
     useEffect(() => {
        publicationsTypeLists().then((response) => {
            setPublicationsTypes(response.data.listOfData);
            toast.success("Fetch parameters successfully!!👍");
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleChange = (e) => {
        setPublicationsType({ ...publicationsType, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await addPublicationsType(publicationsType).catch(console.log);

        if (response?.data.status) {
            setIsDialogOpen(false)
            setPublicationsTypes([...publicationsTypes, response.data.data])
            toast.success("Added parameters successfully!!👍");
        }
    };

    return (
        <>
        <Toaster/>
            <div className='main-container'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="items-start justify-between md:flex mt-12">
                        <div className="max-w-lg">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                Parameters Tables
                            </h3>
                        </div>
                        <div className="mt-3 md:mt-0">
                            <div className="mt-3 md:mt-0 flex gap-4">
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 rounded-lg hover:bg-gray-500 active:bg-gray-800 md:text-sm">Add Parameters</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <DialogHeader>
                                                <DialogTitle className="text-white">Add Parameters</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Label htmlFor="publicationsName" className="text-right text-slate-300 font-bold">Parameter Name</Label>
                                                    <Input onChange={(e) => handleChange(e)} type="text" id="publicationsName" name="publicationsName" placeholder="Enter Parameter Name" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                </div>
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Label htmlFor="benchmarksNo" className="text-right text-slate-300 font-bold">Benchmarks No</Label>
                                                    <Input onChange={(e) => handleChange(e)} type="any" id="benchmarksNo" name="benchmarksNo" placeholder="Enter Benchmark No" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="bg-gray-800 text-white border border-gray-500">Save</Button>
                                                <DialogClose asChild>
                                                    <Button type="button" className="bg-gray-800 text-white border border-gray-500">Close</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 shadow-sm rounded-lg overflow-x-auto">
                        <DataTable columns={columns} data={publicationsTypes} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPublicationsType;