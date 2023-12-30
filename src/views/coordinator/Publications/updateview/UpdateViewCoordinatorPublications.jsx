import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getByPublicationsId, updatePublications } from '@/services/PublicationsService';
import { publicationsTypeLists } from '@/services/PublicationsType';
import toast, { Toaster } from 'react-hot-toast';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewCoordinatorPublications = () => {

    const [publicationsTypes, setPublicationsTypes] = useState([]);
    const [publicationsTypeId, setPublicationsTypeId] = useState();
    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [title, setTitle] = useState("Update Performance");
    const [isDisabled, setIsDisabled] = useState(false);
    const [publicationsType, setPublicationsType] = useState("");
    const [rcCenterName, setRcCenterName] = useState("");

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

    const onSubmit = async (e) => {
        e.preventDefault();
        publication.publicationsType.publicationsTypeId = publicationsTypeId;
        publication.rcCenter.rcCenterId = rcCenterId;
        const response = await updatePublications(publication).catch(console.log)
        if (response?.data?.status) {
            console.log(response.data.data)
            toast.success("Update performance successfully!!👍");
            navigate("/coordinator-dashboard/publications");
        }
    };

    useEffect(() => {

        if (!query.get('updatecall')) {
            setIsDisabled(true)
            setTitle("View Details of Performance")
        }

        publicationsTypeLists().then((response) => {
            setPublicationsTypes(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        getByPublicationsId(params.publicationsId).then((response) => {
            if (!response.data.data) {
                return navigate("/coordinator-dashboard/publications");
            }
            setPublication(response.data.data);
            setPublicationsTypeId(response.data.data.publicationsType.publicationsTypeId);
            setRcCenterId(response.data.data.rcCenter.rcCenterId);
        }).catch(error => {
            console.log(error)
        })

    }, [query, params.publicationsId])

    useEffect(() => {
        const selectedPublicationType = publicationsTypes.find(types => types.publicationsTypeId === publicationsTypeId);
        if (selectedPublicationType) {
            setPublicationsType(selectedPublicationType.publicationsType);
        }
    }, [publicationsTypes, publicationsTypeId]);


    useEffect(() => {
        const selectedCenter = rcCenters.find(center => center.rcCenterId === rcCenterId);
        if (selectedCenter) {
            setRcCenterName(selectedCenter.rcCenterName);
        }
    }, [rcCenters, rcCenterId]);

    return (
        <>
        <Toaster/>
            <div className="main-container">
                <Card className="w-[700px] mx-auto my-20 bg-[#1d2634] text-white">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">

                                    <Label htmlFor="publicationsNo" className="text-right text-slate-300 font-bold">Performance Value</Label>
                                    <Input value={publication.publicationsNo} onChange={(e) => handleChange(e)} disabled={isDisabled} type="number" id="publicationsNo" name="publicationsNo" placeholder="Enter Performance Value" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                    
                                    <Label htmlFor="publicationsType" className="text-right text-slate-300 font-bold">Parameter Name</Label>
                                    <Select value={publicationsType} onValueChange={(value) => {
                                        setPublicationsTypeId(value);
                                        const selectedPublicationsType = publicationsTypes.find(parameters => parameters.publicationsTypeId === value);
                                        if (selectedPublicationsType) {
                                            setPublicationsType(selectedPublicationsType.publicationsType);
                                        }
                                    }} disabled={isDisabled} type="text" name="publicationsType" id="publicationsType" placeholder="Enter Publications Type" required className="col-span-3 border-slate-300 ">
                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                            <SelectValue>{publicationsType || "Select Parameters"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="bg-gray-800 text-white">
                                            {
                                                publicationsTypes.length > 0 ? publicationsTypes.map((parameters) => (
                                                    <div className="" key={parameters.publicationsTypeId}>
                                                        <SelectItem value={parameters.publicationsTypeId}>{parameters.publicationsType}</SelectItem>
                                                    </div>
                                                )) : null
                                            }
                                        </SelectContent>
                                    </Select>

                                    <Label htmlFor="rcCenterName" className="text-right text-slate-300 font-bold">Rc Center</Label>
                                    <Select value={rcCenterName} onValueChange={(value) => {
                                        setRcCenterId(value);
                                        const selectedCenter = rcCenters.find(center => center.rcCenterId === value);
                                        if (selectedCenter) {
                                            setRcCenterName(selectedCenter.rcCenterName);
                                        }
                                    }} disabled={isDisabled} type="text" name="rcCenterName" id="rcCenterName" placeholder="Enter RC Center" required className="col-span-3 border-slate-300 ">
                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                            <SelectValue>{rcCenterName || "Select Rc Center"}</SelectValue>
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
                                <Link to="/coordinator-dashboard/publications">
                                    <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/coordinator-dashboard/publications">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                    </Link>
                                    <Link to="/coordinator-dashboard/publications">
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

export default UpdateViewCoordinatorPublications