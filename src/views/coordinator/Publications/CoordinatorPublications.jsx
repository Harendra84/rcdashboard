import { useEffect, useState } from 'react'
import { columns } from './Columans';
import DataTable from './DataTable';
import { addPublications, publicationsLists, updatePublications } from '@/services/PublicationsService';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { rcCenterLists } from '@/services/RcCenterService';
import { publicationsTypeLists } from '@/services/PublicationsType';

const CoordinatorPublications = (props) => {

    const [publications, setPublications] = useState([]);
    const [publicationsTypes, setPublicationsTypes] = useState([]);
    const [publicationsTypeId, setPublicationsTypeId] = useState();
    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [publication, setPublication] = useState({
        "publicationsId": 0,
        "publicationsNo": 0,
        "rcCenter": {
            "rcCenterId": 0
        },
        "publicationsType": {
            "publicationsTypeId": 0
        }
    });

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        publication.publicationsType.publicationsTypeId = publicationsTypeId;
        publication.rcCenter.rcCenterId = rcCenterId;

        const response = publication.publicationsId !== 0
            ? await updatePublications(publication).catch(console.log)
            : await addPublications(publication).catch(console.log);

        if (response?.data) {
            setIsDialogOpen(false)
            setPublications([...publications, response.data.data])
        }
    };

    useEffect(() => {

        //publications type list 
        publicationsTypeLists().then((response) => {
            setPublicationsTypes(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        // rc center list 
        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        // publications list 
        publicationsLists().then((response) => {
            setPublications(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <div className='main-container'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="items-start justify-between md:flex mt-12">
                        <div className="max-w-lg">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                Publications Table
                            </h3>
                        </div>
                        <div className="mt-3 md:mt-0">
                            <div className="mt-3 md:mt-0 flex gap-4">
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 rounded-lg hover:bg-gray-500 active:bg-gray-800 md:text-sm">Add Publications</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <DialogHeader>
                                                <DialogTitle className="text-white">Add Publication </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="publicationsNo" className="text-right text-slate-300 font-bold">Publication No</Label>
                                                    <Input onChange={(e) => handleChange(e)} type="number" id="publicationsNo" name="publicationsNo" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                                    <Label htmlFor="publicationsType" className="text-right text-slate-300 font-bold">Publication Type</Label>
                                                    <Select onValueChange={(value) => setPublicationsTypeId(value)} name="publicationsType" id="publicationsType" className="col-span-3 border-slate-300 ">
                                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                            <SelectValue placeholder="Select a publications type" />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper" className="bg-gray-800 text-white">
                                                            {
                                                                publicationsTypes.length > 0 ? publicationsTypes.map((type) => (
                                                                    <div className="" key={type.publicationsTypeId}>
                                                                        <SelectItem value={type.publicationsTypeId}>{type.publicationsName}</SelectItem>
                                                                    </div>
                                                                )) : null
                                                            }

                                                        </SelectContent>
                                                    </Select>
                                                    <Label htmlFor="rcCenterName" className="text-right text-slate-300 font-bold">Rc Center</Label>
                                                    <Select onValueChange={(value) => setRcCenterId(value)} name="rcCenterName" id="rcCenterName" className="col-span-3 border-slate-300 ">
                                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                            <SelectValue placeholder="Select Rc Center" />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper" className="bg-gray-800 text-white">
                                                            {
                                                                rcCenters.length > 0 ? rcCenters.map((center) => (
                                                                    <div className="" key={center.rcCenterId}>
                                                                        <SelectItem value={center.rcCenterId}>{center.rcCenterName}</SelectItem>
                                                                    </div>
                                                                )) : null
                                                            }

                                                        </SelectContent>
                                                    </Select>
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
                        <DataTable columns={columns} data={publications} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoordinatorPublications;