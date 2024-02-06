type Props = { color: string; text: string };

interface Badges {
  [key: string]: JSX.Element;
  default: JSX.Element;
  dark: JSX.Element;
  red: JSX.Element;
  green: JSX.Element;
  yellow: JSX.Element;
  indigo: JSX.Element;
  purple: JSX.Element;
  pink: JSX.Element;
}

const Badge = (props: Props) => {
  const { color, text } = props;

  const badges: Badges = {
    default: (
      <span class="mx-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
        {text}
      </span>
    ),
    dark: (
      <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        {text}
      </span>
    ),
    red: (
      <span class="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
        {text}
      </span>
    ),
    green: (
      <span class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        {text}
      </span>
    ),
    yellow: (
      <span class="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
        {text}
      </span>
    ),
    indigo: (
      <span class="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
        {text}
      </span>
    ),
    purple: (
      <span class="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
        {text}
      </span>
    ),
    pink: (
      <span class="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
        {text}
      </span>
    ),
  };

  return badges[color] || badges.default;
};

export default Badge;
