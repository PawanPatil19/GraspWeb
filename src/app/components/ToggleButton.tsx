import { use, useEffect, useState } from "react";
import Switch from "react-switch";
import axios from "axios";

interface SwitchButtonProps {
    checked: boolean;
    postID: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
    checked,
    postID
}) => {

    const [isChecked, setChecked] = useState(checked);
    
    const handleChange = () => {
        const data = {
            postID: postID,
            published: isChecked
        }
        console.log("Checked: ", isChecked);
        
        axios.post("/api/changeVisibility", data).then((res) => {
            console.log(res.data);
            setChecked(!isChecked);
            console.log("Checked: ", isChecked);
        });
    }


    return (
        <Switch 
            onChange={handleChange}
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
        />
    )
}

export default SwitchButton;