import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react"

    const Debounced = ({
        value: initValue,
        onChange,
        debounce=500,
        ...props
    }) => {
    const [value, setValue] = useState();
        
    useEffect(() => {
      setValue(initValue)
    }, [initValue]);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce);
    return () => clearTimeout(timeout)
    }, [value]);

    
    return (
        <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} className="max-w-xs bg-gray-600 text-slate-50"/>
    )
}

export default Debounced