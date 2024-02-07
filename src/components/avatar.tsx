import { User } from "lucia";

type AvatarProps = {
  user: User;
};

export default function Avatar({ user }: AvatarProps) {
  return (
    <>
      <img
        src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user.username}&backgroundType=gradientLinear,solid&radius=50`}
        alt={`Avatar for ${user.username}`}
        referrer-policy="no-referrer"
        draggable="false"
        class="object-cover w-10 h-10 border rounded-full"
      />
      <span class="sr-only">{user.username}</span>
    </>
  );
}
