import { useEffect, useMemo, useState } from 'react'
import { addUser, getUserById, updateUser, userLists } from '@/services/UserService';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getByPublicationsId, publicationsLists, updatePublications } from '@/services/PublicationsService';
import { publicationsTypeLists } from '@/services/PublicationsType';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewCeoPublications = () => {

    const [publicationsTypes, setPublicationsTypes] = useState([]);
    const [publicationsTypeId, setPublicationsTypeId] = useState();
    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [title, setTitle] = useState("Update Parameters");
    const [isDisabled, setIsDisabled] = useState(false);
    const query = useQuery();
    const params = useParams();
    const navigate = useNavigate();

    const [publication, setPublication] = useState({
        "publicationsId": 0,
        "publicationsNo": 0,
        "publicationsType": {
            "publicationsTypeId": 0
        },
        "rcCenter": {
            "rcCenterId": 0
        }
    });

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    };

    useEffect(() => {

        if (!query.get('updatecall')) {
            setIsDisabled(true)
            setTitle("View Details of Parameters")
        }

        //publications type list 
        publicationsTypeLists().then((response) => {
            setPublicationsTypes(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        //rc center list 
        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        getByPublicationsId(params.publicationsId).then((response) => {
            if (!response.data.data) {
                return navigate("/ceo-dashboard/publications");
            }
            setPublication(response.data.data);
            setPublicationsTypeId(response.data.data.publicationsType.publicationsTypeId);
            setRcCenterId(response.data.data.rcCenter.rcCenterId);
        }).catch(error => {
            console.log(error)
        })

    }, [query, params.publicationsId])

    const onSubmit = async (e) => {
        e.preventDefault();
        publication.publicationsType.publicationsTypeId = publicationsTypeId;
        publication.rcCenter.rcCenterId = rcCenterId;
        const response = await updatePublications(publication).catch(console.log)
        if (response?.data.status) {
            toast.success("Update performance successfully!!👍");
            navigate("/ceo-dashboard/publications");
        }
    };

    return (
        <>
            <div className="main-container">
                <Card className="w-[1100px] mx-auto my-20 bg-[#1d2634] text-white">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    
                                    <Label htmlFor="publicationsNo" className="text-right text-slate-300 font-bold">Parameters Value</Label>
                                    <Input value={publication.publicationsNo} onChange={(e) => handleChange(e)} disabled={isDisabled} id="publicationsNo" name="publicationsNo" placeholder="Enter Parameter Name" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                    <Label htmlFor="publicationsName" className="text-right text-slate-300 font-bold">Parameter Name</Label>
                                    <Select value={publicationsTypeId} onValueChange={(value) => setPublicationsTypeId(value)} disabled={isDisabled} name="publicationsName" id="publicationsName" className="col-span-3 border-slate-300 ">
                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                            <SelectValue placeholder="Select Parameter Name" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="bg-gray-800 text-white">
                                            {
                                                publicationsTypes.length > 0 ? publicationsTypes.map((parameter) => (
                                                    <div className="" key={parameter.publicationsTypeId}>
                                                        <SelectItem value={parameter.publicationsTypeId}>{parameter.publicationsName}</SelectItem>
                                                    </div>
                                                )) : null
                                            }
                                        </SelectContent>
                                    </Select>

                                    <Label htmlFor="rcCenterId" className="text-right text-slate-300 font-bold">Rc Center</Label>
                                    <Select value={rcCenterId} onValueChange={(value) => setRcCenterId(value)} disabled={isDisabled} id="rcCenterId" name="rcCenterId" className="col-span-3 border-slate-300 ">
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
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {!query.get('updatecall') ? (
                                <Link to="/ceo-dashboard/publications">
                                    <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/ceo-dashboard/publications">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                    </Link>
                                    <Link to="/ceo-dashboard/publications">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Cancel</Button>
                                    </Link>
                                </>
                            )}
                            <Button type="submit" disabled={isDisabled} className="bg-gray-800 text-white border border-gray-500">Save</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default UpdateViewCeoPublications