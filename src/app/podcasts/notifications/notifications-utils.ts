const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'Twitter':
      return 'fa-brands fa-twitter';
    case 'IFTTT':
      return 'fa-solid fa-house-crack';
    case 'Slack':
      return 'fa-brands fa-slack';
    case 'Email':
      return 'fa-solid fa-envelope';
    case 'Facebook':
      return 'fa-brands fa-facebook';
    case 'WebHook':
      return 'fa-solid fa-explosion';
    case 'PushBullet':
      return 'fa-solid fa-bullseye';
    default:
      return 'fa-solid fa-bolt-lightning';
  }
};

export { getNotificationIcon };
