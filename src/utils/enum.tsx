import { formatData } from '@/utils/methods';
import useTranslation from '@/hooks/useTranslation';
export const whiteList = ['/game/web/nft-event/mint-success', '/game/web/nft-event/compose', '/game/web/nft-backpack/distribute', '/game/web/nft-backpack/take-back', '/game/web/nft-backpack/transfer']

export const MessageType = (type: number, message: any) => {
  const typeEnum = {
    1: data => ({
      desc: '充币',
      title: 'Deposit successfully',
      content: `Completed the deposit of ${data.values.amount} ${data.values.currency
        } on ${formatData(data.values.ts)}`,
      type: 'success',
    }),
    2: data => ({
      desc: '提币',
      title: 'Withdraw successfully',
      content: `Completed the withdraw of ${data.values.amount} ${data.values.currency
        } on ${formatData(data.values.ts)}`,
      type: 'success',
    }),
    3: data => ({
      desc: '提币被拒绝',
      title: 'Withdrawal refused',
      content: `The withdrawal application of ${data.values.amount} ${data.values.currency
        } was rejected on ${formatData(data.values.ts)}`,
      type: 'warning',
    }),
    4: data => ({
      desc: '余额变更',
      title: 'Change Balance',
      content: (
        <div>
          The account balance has changed!
          <br />
          {`Amount of change:${data.values.change} ${data.values.currency}`}
          <br />
          {`Balance after change:${data.values.after} ${data.values.currency}`}
        </div>
      ),
      type: 'warning',
    }),
  };
  return typeEnum[type] ? typeEnum[type](message) : null;
};
export const news = [
  {
    img: '/images/news/common/9.png',
    title: useTranslation().t('news1.title'),
    brief: useTranslation().t('news1.brief'),
    desc: useTranslation().t('news1.desc'),
    date: useTranslation().t('news1.date')
  },
  //新的三篇文章
  {
    img: '/images/news/common/6.png',
    title: useTranslation().t('news2.title'),
    brief: useTranslation().t('news2.brief'),
    desc: useTranslation().t('news2.desc'),
    date: useTranslation().t('news2.date'),
  },
  {
    img: '/images/news/common/7.png',
    table: true,
    title: useTranslation().t('news3.title'),
    brief: useTranslation().t('news3.brief'),
    desc: useTranslation().t('news3.desc'),
    date: useTranslation().t('news3.date'),
  },
  {
    img: '/images/news/common/8.png',
    title: useTranslation().t('news4.title'),
    brief: useTranslation().t('news4.brief'),
    desc: useTranslation().t('news4.desc'),
    date: useTranslation().t('news4.date'),
  },
  //置顶文章

  {
    img: '/images/news/common/2.png',
    title: useTranslation().t('newsTop1.title'),
    brief: useTranslation().t('newsTop1.brief'),
    desc: useTranslation().t('newsTop1.desc'),
    date: useTranslation().t('newsTop1.title')
  },
  {
    img: '/images/news/common/3.png',
    title: useTranslation().t('newsTop2.title'),
    brief: useTranslation().t('newsTop2.brief'),
    date: useTranslation().t('newsTop2.date')
  },
  {
    img: '/images/news/common/4.png',
    title: useTranslation().t('newsTop3.title'),
    brief: useTranslation().t('newsTop3.brief'),
    date: useTranslation().t('newsTop3.date')
  },
  {
    img: '/images/news/common/1.png',
    title: useTranslation().t('newsTop4.title'),
    brief: useTranslation().t('newsTop4.brief'),
    date: useTranslation().t('newsTop4.date')
  },
  {
    img: '/images/news/common/5.png',
    title: useTranslation().t('newsTop5.title'),
    brief:useTranslation().t('newsTop5.brief'),
    date: useTranslation().t('newsTop5.date')
  },
];

export const TableList = [
  { index: 1, name: 'Talo' },
  { index: 2, name: 'Tahmineh' },
  { index: 3, name: 'Raygan' },
  { index: 4, name: 'GM007' },
  { index: 5, name: 'Nrez' },
  { index: 6, name: 'TagaPANA' },
  { index: 7, name: 'jaybeewat' },
  { index: 8, name: 'Luxing' },
  { index: 9, name: 'soramameg' },
  { index: 10, name: 'oldwolf' },
  { index: 11, name: 'MvpVj' },
  { index: 12, name: 'dub' },
  { index: 13, name: 'john' },
  { index: 14, name: 'yopparai3' },
  { index: 15, name: 'Chardd' },
  { index: 16, name: 'GC' },
  { index: 17, name: 'DecipherO' },
  { index: 18, name: 'NecrosHolly' },
  { index: 19, name: 'sp1c3r' },
  { index: 20, name: 'Magich' },

  { index: 21, name: 'sjr' },
  { index: 22, name: 'Nhine' },
  { index: 23, name: 'Royse' },
  { index: 24, name: '蔡徐坤' },
  { index: 25, name: 'FaithFGZ' },
  { index: 26, name: 'solomon' },
  { index: 27, name: 'Mcwi' },
  { index: 28, name: 'Hanszhou' },
  { index: 29, name: 'Titania' },
  { index: 30, name: 'Seeds_Nick' },

  { index: 31, name: 'fatcat' },
  { index: 32, name: 'ClarenzRDG' },
  { index: 33, name: 'GM002' },
  { index: 34, name: 'Poiichan' },
  { index: 35, name: 'jeffry' },
  { index: 36, name: 'Spirikitik' },
  { index: 37, name: 'Bino' },
  { index: 38, name: 'fat_hero' },
  { index: 39, name: 'cripdoeboogi' },
  { index: 40, name: 'BennROG' },

  { index: 41, name: 'Ohrange' },
  { index: 42, name: 'nyanta' },
  { index: 43, name: 'BuggedOut' },
  { index: 44, name: 'DatingDaan' },
  { index: 45, name: '星辰与月' },
  { index: 46, name: 'PNLP_RDG' },
  { index: 47, name: 'scotts' },
  { index: 48, name: 'BaldEaglePGG' },
  { index: 49, name: 'selfi' },
  { index: 50, name: 'Cai' },
];
export const monthText = [
  '',
  useTranslation().t('common.January'),
  useTranslation().t('common.February'),
  useTranslation().t('common.March'),
  useTranslation().t('common.April'),
  useTranslation().t('common.May'),
  useTranslation().t('common.June'),
  useTranslation().t('common.July'),
  useTranslation().t('common.August'),
  useTranslation().t('common.September'),
  useTranslation().t('common.October'),
  useTranslation().t('common.November'),
  useTranslation().t('common.December'),
];
export const nftType = [
  {
    state: 0,
    text: 'Unknown',
    color: '#28293D',
    borderColor: '#C7C9D9'
  },
  {
    state: 1,
    text: useTranslation().t('common.nft.status5'),
    color: '#28293D',
    borderColor: '#F2F2F5'
  },
  {
    state: 2,
    text: useTranslation().t('common.nft.status6'),
    color: '#327455',
    borderColor: '#F2F2F5'
  },
  {
    state: 3,
    text: useTranslation().t('common.nft.status1'),
    color: '#06C270',
    borderColor: '#F2F2F5'
  },
  {
    state: 4,
    text: useTranslation().t('common.nft.status0'),
    color: '#0063F7',
    borderColor: '#F2F2F5'
  },
  {
    state: 5,
    text: useTranslation().t('common.nft.status2'),
    color: '#FF8800',
    borderColor: '#F2F2F5'
  },
  {
    state: 6,
    text: useTranslation().t('common.nft.status3'),
    color: '#AC5DD9',
    borderColor: '#F2F2F5'
  },
  {
    state: 7,
    text: useTranslation().t('common.nft.status7'),
    color: '#FDDD48',
    borderColor: '#F2F2F5'
  },
]
export const topPages = ['/', '/games', '/news', '/marketplace', '/market', '/ranking', '/item-details', '/invite', '/help'];
export const auctionType = [
  {
    label: useTranslation().t('common.nft.status3'),
    value: 0,
    color: '#8F90A6',
    bg: '#fff',
    borderColor: '#F2F2F5',
    borderBg: '#AC5DD9'
  },
  {
    label: 'Finished',
    value: 1,
    color: '#fff',
    bg: '#06C270',
    borderColor: '#F2F2F5',
    borderBg: '#57EBA1'
  },
  {
    label: 'Cancelled',
    value: 2,
    color: '#8F90A6',
    bg: '#F2F2F5',
    borderColor: '#F2F2F5',
    borderBg: '#C7C9D9'
  },
  {
    label: useTranslation().t('common.nft.status7'),
    value: 3,
    color: '#8F90A6',
    bg: '#fff',
    borderColor: '#F2F2F5',
    borderBg: '#FDDD48'
  },
]

