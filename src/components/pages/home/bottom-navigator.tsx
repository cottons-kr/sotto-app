import { Row } from '@/components/layout/row';
import { ButtonGroup } from '@/components/ui/button/group';
import { Typo } from '@/components/ui/typography';
import { cn } from '@/lib/common';
import { CalendarDays, LayoutGrid, Plus } from 'lucide-react';
import { AnimatePresence, type Variants, motion } from 'motion/react';
import { useQueryState } from 'nuqs';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	addButton,
	navigator,
	viewButton,
	viewButtonActive,
} from './styles/bottom-navigator.css';

const variants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
			mass: 0.8,
			duration: 0.3,
		},
	},
};

export function HomeBottomNavigator() {
	const [currentTab] = useQueryState('tab', { defaultValue: 'my' });
	const navigate = useNavigate();

	const onClickAddButton = useCallback(() => {
		navigate('/diary');
	}, [navigate]);

	console.log('currentTab', currentTab);

	return (
		<ButtonGroup float>
			<AnimatePresence>
				{currentTab === 'my' && (
					<motion.div
						className={navigator}
						variants={variants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<Row gap={8}>
							<ViewButton icon={<LayoutGrid />} label='List' value='list' />
							<button
								type='button'
								className={addButton}
								onClick={onClickAddButton}
							>
								<Plus />
							</button>
							<ViewButton
								icon={<CalendarDays />}
								label='Calendar'
								value='calendar'
							/>
						</Row>
					</motion.div>
				)}
			</AnimatePresence>
		</ButtonGroup>
	);
}

interface ViewButtonProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

function ViewButton(props: ViewButtonProps) {
	const { icon, label, value } = props;

	const [currentView, setCurrentView] = useQueryState('view', {
		defaultValue: 'list',
	});

	const onClick = useCallback(() => {
		setCurrentView(value);
	}, [value, setCurrentView]);

	return (
		<Row
			className={cn(viewButton, { [viewButtonActive]: currentView === value })}
			gap={8}
			align='center'
			onClick={onClick}
		>
			{icon}
			<Typo.Body weight='medium'>{label}</Typo.Body>
		</Row>
	);
}
