import { Link } from 'rspress/theme';
import { useLang } from 'rspress/runtime';
import { useI18n } from '../../i18n/index';

function useFooterData() {
  const t = useI18n();
  const lang = useLang();
  const getLink = (link: string) => (lang === 'en' ? link : `/${lang}${link}`);

  return [
    {
      title: t('guide'),
      items: [
        {
          title: t('quickStart'),
          link: getLink('/guide/quick-start'),
        },
        {
          title: t('general'),
          link: getLink('/guide/inference_general_overview'),
        },
        {
          title: t('llm'),
          link: getLink('/guide/inference_llm_overview'),
        },
        {
          title: t('micro'),
          link: getLink('/guide/micro_overview'),
        },
      ],
    },
    {
      title: 'Database',
      items: [
        {
          title: 'Vender Info',
          link: 'https://github.com/bytedance/ByteMLPerf/tree/main/vendor_zoo',
        },
      ],
    },
    {
      title: t('friendLink'),
      items: [
        {
          title: 'ByteIR',
          link: 'https://byteir.ai/',
        },
      ],
    },
    {
      title: t('community'),
      items: [
        {
          title: 'GitHub',
          link: 'https://github.com/bytedance/ByteMLPerf',
        },
        {
          title: 'Slack',
          link: 'https://join.slack.com/t/bytemlperf/shared_invite/zt-22xvubtis-trjq8Cc~mutM8tlVdPmX5w',
        },
      ],
    },
  ];
}

export function HomeFooter() {
  const footerData = useFooterData();
  return (
    <div className="flex flex-col border-t dark:border-dark-50 items-center mt-[80px]">
      <div className="pt-8 pb-4 w-full justify-around max-w-6xl hidden sm:flex">
        {footerData.map((item, index) => (
          <div key={index} className="flex flex-col items-start">
            <h2 className="font-bold my-4 text-lg">{item.title}</h2>
            <ul className="flex flex-col gap-3">
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link href={subItem.link}>
                    <span className="font-normal">{subItem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-center">
        <h2 className="font-normal text-sm text-gray-600 dark:text-light-600 py-4">
          © 2024 Bytedance Inc. All Rights Reserved.
        </h2>
      </div>
    </div>
  );
}
