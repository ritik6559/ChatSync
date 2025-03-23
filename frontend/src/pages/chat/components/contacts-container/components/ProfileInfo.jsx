import React from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {getColor, HOST} from "@/utils/constants.js";
import {useAppStore} from "@/store/index.js";
import {TooltipProvider} from "@/components/ui/tooltip.jsx";
import {Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip.jsx";
import {FaEdit2} from "react-icons/fa";

const ProfileInfo = () => {

    const { userInfo } = useAppStore();

    return (
        <div
            className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]"
        >
            <div className={"flex gap-3 items-center justify-center"} >
                <div>
                    <Avatar className={" h-12 w-12 rounded-full overflow-hidden"} >
                        {
                            userInfo.image
                                ? <AvatarImage src={ `${HOST}/${userInfo.image}`} alt={"profile"} className={"object-cover w-full h-full bg-black"} />
                                : (
                                    <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`} >
                                        {
                                            userInfo.firstName
                                                ? userInfo.firstName.split('').shift()
                                                : userInfo.email?.split('').shift()
                                        }
                                    </div>
                                )
                        }
                    </Avatar>
                </div>
                <div>
                    { userInfo.firstName && userInfo.lastName
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : "" }
                </div>
            </div>
            <div className="flex gap-3" >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FaEdit2 />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default ProfileInfo;
