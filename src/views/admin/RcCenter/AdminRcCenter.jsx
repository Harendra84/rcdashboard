import { useEffect, useState } from 'react'
import { columns } from './Columans';
import DataTable from './DataTable';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addRcCenter, rcCenterLists, updateRcCenter } from '@/services/RcCenterService';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import toast, { Toaster } from 'react-hot-toast';

const AdminRcCenter = (props) => {

    const [rcCenters, setRcCenters] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [rcCenter, setRcCenter] = useState({
        "rcCenterName": "",
        "totalMembers": 0,
    });

    const handleChange = (e) => {
        setRcCenter({ ...rcCenter, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await addRcCenter(rcCenter).catch(console.log);
        if (response?.data.status) {
            setIsDialogOpen(false)
            setRcCenters([...rcCenters, response.data.data])
            toast.success("Added RC Center successfully!!👍");
        }
    };

    
    // rc center list
    useEffect(() => {
        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
            toast.success("Fetch RC Centers successfully!!👍");
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <Toaster />
            <div className='main-container'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="items-start justify-between md:flex mt-12">
                        <div className="max-w-lg">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                Rc Center Table
                            </h3>
                        </div>
                        <div className="mt-3 md:mt-0">
                            <div className="mt-3 md:mt-0 flex gap-4">
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 rounded-lg hover:bg-gray-500 active:bg-gray-800 md:text-sm">Add Rc Center</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <DialogHeader>
                                                <DialogTitle className="text-white">Add Rc Center </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-2 items-center gap-4">
                                                    <Label htmlFor="rcCenterName" className="text-right text-slate-300 font-bold">Rc Center Name</Label>
                                                    <Input onChange={(e) => handleChange(e)} id="rcCenterName" name="rcCenterName" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                    <Label htmlFor="totalMembers" className="text-right text-slate-300 font-bold">Total Members</Label>
                                                    <Input onChange={(e) => handleChange(e)} type="number" name="totalMembers" id="totalMembers" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
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
                        <DataTable columns={columns} data={rcCenters} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminRcCenter;