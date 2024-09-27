import { usePathname } from 'next/navigation';
import ConversationPage from '@/app/(dashboard)/(routes)/conversation/page';
import ImageGenerationPage from '@/app/(dashboard)/(routes)/image/page';
import VideoGenerationPage from '@/app/(dashboard)/(routes)/video/page';
import MusicGenerationPage from '@/app/(dashboard)/(routes)/music/page';
import CodeGenerationPage from '@/app/(dashboard)/(routes)/code/page';
import { DashboardContent } from './Sidebar';

const DashboardPages = () => {
    const router = usePathname();

    let content;
    switch (router) {
        case "/dashboard":
            content = <DashboardContent />;
            break;
        case "/conversation":
            content = <ConversationPage />;
            break;
        case "/image":
            content = <ImageGenerationPage />;
            break;
        case "/video":
            content = <VideoGenerationPage />;
            break;
        case "/music":
            content = <MusicGenerationPage />;
            break;
        case "/code":
            content = <CodeGenerationPage />;
            break;
        default:
            content = null;
            break;
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default DashboardPages