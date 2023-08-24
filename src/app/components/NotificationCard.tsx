import { Notification } from "@prisma/client";
import { FaUserCircle } from "react-icons/fa";
import moment from 'moment';

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const unread = !notification.statusRead;
  console.log(unread);

  const content = {
    like: "liked your post",
    clone: "cloned your post",
  }

  return (
    <article className={`flex flex-row px-4 py-2 rounded-xl gap-4 ${unread && "bg-light-grayish-blue-1"}`}>
      <FaUserCircle
        className="my-2 text-gray-300 text-3xl"
      />
      <div className="w-[100%] justify-center text-sm">
        <div className="flex flex-row justify-between ">
          <div>
            <p>
              <span className="font-bold text-very-dark-blue hover:text-blue cursor-pointer pr-1">
                {notification.notificationProviderName}
              </span>
              <span className="text-clip text-dark-grayish-blue pr-1">
                {
                    content[notification.notificationType as keyof typeof content]
                }
              </span>
              <span className="font-bold text-very-dark-blue hover:text-blue cursor-pointer pr-1">
                <a href={`/view/${notification.postID}`}>
                {notification.postTitle}
                </a>
              </span>
              {unread && (
                <div className="inline-block bg-red h-2 w-2 mx-[2px] mt-1 rounded-[50%]" />
              )}
            </p>
            <p className="text-grayish-blue">{moment(notification.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NotificationCard;