import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getByRcCenterId, updateRcCenter } from '@/services/RcCenterService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewAdminRcCenter = () => {

    const [title, setTitle] = useState("Update Rc Center");
    const [isDisabled, setIsDisabled] = useState(false);

    const query = useQuery();
    const params = useParams();
    const navigate = useNavigate();

    const [rcCenter, setRcCenter] = useState({
        "rcCenterId": 0,
        "rcCenterName": "",
        "totalMembers": 0,
    });

    const handleChange = (e) => {
        setRcCenter({ ...rcCenter, [e.target.name]: e.target.value });
    };

    useEffect(() => {

        if (!query.get('updatecall')) {
            setIsDisabled(true)
            setTitle("View Details of Rc Center")
        }

        getByRcCenterId(params.rcCenterId).then((response) => {
            if (!response.data.data) {
                return navigate("/admin-dashboard/rcCenter");
            }
            setRcCenter(response.data.data);
        }).catch(error => {
            console.log(error)
        })

    }, [query, params.rcCenterId])

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await updateRcCenter(rcCenter).catch(console.log)
        if (response?.data?.status) {
            navigate("/admin-dashboard/rcCenter");
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
                                <div className="grid grid-cols-10 items-center gap-4">
                                    <Label htmlFor="rcCenterName" className="text-right text-slate-300 font-bold">Rc Center Name</Label>
                                    <Input value={rcCenter.rcCenterName} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" id="rcCenterName" name="rcCenterName" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="totalMembers" className="text-right text-slate-300 font-bold">Total Members</Label>
                                    <Input value={rcCenter.totalMembers} onChange={(e) => handleChange(e)} disabled={isDisabled} type="number" name="totalMembers" id="totalMembers" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {!query.get('updatecall') ? (
                                <Link to="/admin-dashboard/rcCenter">
                                    <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/admin-dashboard/rcCenter">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                    </Link>
                                    <Link to="/admin-dashboard/rcCenter">
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

export default UpdateViewAdminRcCenter