import React from 'react';
import {useAppStore} from "@/store/index.js";

const Profile = () => {

    const {userInfo} = useAppStore();

    return (
        <div>
            Profile: {userInfo && userInfo.email}
        </div>
    );
};

export default Profile;