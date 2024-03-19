import { FC } from 'react';

// 假设这是你的logo图片路径数组
const logos = [
  { src:'/usedby/graphcore.png', href: 'https://www.graphcore.ai/'},
  { src:'/usedby/habana.png', href: 'https://habana.ai/'},
  { src:'/usedby/moffett.png', href: 'https://moffett.ai/'},
  { src:'/usedby/stream.png', href: 'https://www.streamcomputing.com/'}
];

export const Contributors: FC = () => (
  <>
    <hr />
    <div className="flex flex-col my-4 items-center overflow-x-auto">
      <h2 className="text-3xl mt-12 mb-12 font-bold">Supporting Vendors</h2>
      <div className="flex justify-center items-center flex-wrap">
        {logos.map((logo, index) => (
          <a key={index} href={logo.href} target="_blank" rel="noopener noreferrer" className="m-4">
            <img src={logo.src} alt={`Vendor ${index + 1}`} style={{ width: '150px', height: 'auto' }} />
          </a>
        ))}
      </div>
    </div>
    <div className="flex flex-col my-4 items-center overflow-x-auto">
      <h2 className="text-3xl mt-12 mb-12 font-bold">Contributors</h2>
      <object data="https://opencollective.com/ByteMLPerf/contributors.svg?width=900&button=false" />
    </div>
  </>
);
