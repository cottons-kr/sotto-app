import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Divider } from '@/components/ui/divider';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { color } from '@/styles/color.css';
import { Share } from 'lucide-react';
import { page, textArea, textAreaContainer, titleInput } from './page.css';

export default function NewDiaryPage() {
	return (
		<Column className={page} justify='start'>
			<TopNavigator leadingArea={<GoBack />} trailingArea={<Share />} />
			<Container vertical='large' horizontal='large'>
				<Column gap={12}>
					<input className={titleInput} placeholder='New Diary' />
					<Typo.Caption color={color.sand}>Last Edited : 9:41 PM</Typo.Caption>
				</Column>
			</Container>
			<Divider />
			<Container
				className={textAreaContainer}
				vertical='large'
				horizontal='large'
			>
				<textarea className={textArea} placeholder='Write your diary' />
			</Container>
		</Column>
	);
}
