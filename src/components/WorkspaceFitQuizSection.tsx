import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  ChevronLeft,
  DoorClosed,
  LaptopMinimal,
  Mail,
  MapPin,
  MonitorSmartphone,
  Presentation,
  Sparkles,
  UserRound,
  Users,
  UsersRound,
  X,
} from 'lucide-react'
import { workspaceQuizSteps } from '../data/siteContent'
import type {
  QuizGlyphName,
  MoveInTimelineValue,
  TeamSizeValue,
  WorkspaceQuizAnswers,
  WorkspaceTypeValue,
} from '../types/site'
import { ArrowIcon } from './shared/icons'
import { ShuffleText } from './shared/ShuffleText'
import './WorkspaceFitQuizSection.css'

const initialAnswers: WorkspaceQuizAnswers = {
  workspaceType: null,
  teamSize: null,
  locationId: null,
  timeline: null,
}

interface WorkspaceFitQuizSectionProps {
  onComplete: (answers: WorkspaceQuizAnswers) => void
}

function QuizIcon({ name, className }: { name: QuizGlyphName; className?: string }) {
  const iconMap = {
    coworking: LaptopMinimal,
    'dedicated-desk': MonitorSmartphone,
    'private-office': DoorClosed,
    'meeting-room': Presentation,
    'virtual-office': Mail,
    solo: UserRound,
    pair: Users,
    'team-small': UsersRound,
    'team-medium': UsersRound,
    'team-large': Building2,
    location: MapPin,
    week: CalendarClock,
    month: CalendarClock,
    later: Sparkles,
    explore: Sparkles,
  } satisfies Record<QuizGlyphName, ComponentType<{ className?: string }>>

  const Icon = iconMap[name]
  return <Icon className={className} aria-hidden="true" />
}

export function WorkspaceFitQuizSection({ onComplete }: WorkspaceFitQuizSectionProps) {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<WorkspaceQuizAnswers>(initialAnswers)

  const currentStep = workspaceQuizSteps[currentStepIndex]
  const currentValue = answers[currentStep.key]
  const stepLabel = `${String(currentStepIndex + 1).padStart(2, '0')} / ${String(workspaceQuizSteps.length).padStart(2, '0')}`
  const ctaLabel = currentStepIndex === workspaceQuizSteps.length - 1 ? 'Find my branch' : 'Next'
  const columns = useMemo(() => Math.min(currentStep.options.length, 5), [currentStep.options.length])

  const updateAnswer = <TKey extends keyof WorkspaceQuizAnswers>(
    key: TKey,
    value: WorkspaceQuizAnswers[TKey],
  ) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [key]: value,
    }))
  }

  const handleSelect = (value: string) => {
    switch (currentStep.key) {
      case 'workspaceType':
        updateAnswer('workspaceType', value as WorkspaceTypeValue)
        break
      case 'teamSize':
        updateAnswer('teamSize', value as TeamSizeValue)
        break
      case 'locationId':
        updateAnswer('locationId', value as NonNullable<WorkspaceQuizAnswers['locationId']>)
        break
      case 'timeline':
        updateAnswer('timeline', value as MoveInTimelineValue)
        break
      default:
        break
    }
  }

  const handleReset = () => {
    setHasStarted(false)
    setAnswers(initialAnswers)
    setCurrentStepIndex(0)
  }

  const handleNext = () => {
    if (!currentValue) return

    if (currentStepIndex === workspaceQuizSteps.length - 1) {
      onComplete(answers)
      return
    }

    setCurrentStepIndex((stepIndex) => stepIndex + 1)
  }

  return (
    <section className="workspace-quiz-section" aria-labelledby="workspace-quiz-title">
      <div className="workspace-quiz__rails" aria-hidden="true" />
      <div className="workspace-quiz__shell">
        <div className="workspace-quiz__topbar">
          <button
            type="button"
            className="workspace-quiz__chrome-button"
            onClick={() => setCurrentStepIndex((stepIndex) => Math.max(0, stepIndex - 1))}
            disabled={!hasStarted || currentStepIndex === 0}
            aria-label="Go to previous step"
          >
            <ChevronLeft className="workspace-quiz__control-icon" aria-hidden="true" />
          </button>

          <div className="workspace-quiz__brand-spacer" aria-hidden="true" />

          <button
            type="button"
            className="workspace-quiz__chrome-button"
            onClick={handleReset}
            aria-label="Reset quiz"
          >
            <X className="workspace-quiz__control-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="workspace-quiz__stage">
          {hasStarted && <div className="workspace-quiz__progress">{stepLabel}</div>}

          <AnimatePresence mode="wait">
            {!hasStarted ? (
              <motion.div
                key="intro"
                className="workspace-quiz__intro"
                initial={{ opacity: 0, y: 32, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.985 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="workspace-quiz__badge workspace-quiz__badge--solo">
                  <span className="workspace-quiz__badge-icon">
                    <QuizIcon name="solo" className="workspace-quiz__badge-glyph" />
                  </span>
                  <span>Solo operator</span>
                </span>
                <span className="workspace-quiz__badge workspace-quiz__badge--location">
                  <span className="workspace-quiz__badge-icon">
                    <QuizIcon name="location" className="workspace-quiz__badge-glyph" />
                  </span>
                  <span>Across Karachi</span>
                </span>
                <span className="workspace-quiz__badge workspace-quiz__badge--team">
                  <span className="workspace-quiz__badge-icon">
                    <QuizIcon name="team-medium" className="workspace-quiz__badge-glyph" />
                  </span>
                  <span>Growing teams</span>
                </span>

                <h2 id="workspace-quiz-title" className="workspace-quiz__title workspace-quiz__title--intro">
                  <span><ShuffleText text="Find Your" finalColor="#15110d" /></span>
                  <span><ShuffleText text="Work Hall Match" startDelay={120} finalColor="#15110d" /></span>
                </h2>

                <p className="workspace-quiz__intro-copy">
                  Four quick decisions. We&apos;ll point you to the right setup, the right branch,
                  and the next step that actually fits.
                </p>

                <div className="workspace-quiz__intro-pills" aria-hidden="true">
                  <span>Private offices</span>
                  <span>Dedicated desks</span>
                  <span>Meeting rooms</span>
                  <span>Virtual office</span>
                </div>

                <div className="workspace-quiz__intro-sidecard workspace-quiz__intro-sidecard--left">
                  <div className="workspace-quiz__intro-sidecard-icon">
                    <Building2 aria-hidden="true" />
                  </div>
                  <strong>6 locations</strong>
                  <span>spread across Karachi&apos;s work corridors</span>
                </div>

                <div className="workspace-quiz__intro-sidecard workspace-quiz__intro-sidecard--right">
                  <div className="workspace-quiz__intro-sidecard-icon">
                    <CalendarClock aria-hidden="true" />
                  </div>
                  <strong>Fastest route</strong>
                  <span>choose the setup first, then jump straight to the best branch</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep.key}
                className="workspace-quiz__step"
                initial={{ opacity: 0, y: 32, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.985 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 id="workspace-quiz-title" className="workspace-quiz__title">
                  <ShuffleText text={currentStep.prompt} finalColor="#15110d" />
                </h2>

                <div
                  className="workspace-quiz__grid"
                  style={{ ['--workspace-quiz-columns' as string]: String(columns) }}
                >
                  {currentStep.options.map((option) => {
                    const isSelected = currentValue === option.value

                    return (
                      <button
                        type="button"
                        key={option.value}
                        className={isSelected ? 'workspace-quiz__option is-selected' : 'workspace-quiz__option'}
                        onClick={() => handleSelect(option.value)}
                        aria-pressed={isSelected}
                    >
                      <span className="workspace-quiz__option-icon">
                        <QuizIcon name={option.icon} className="workspace-quiz__option-glyph" />
                      </span>
                      <span className="workspace-quiz__option-label">{option.label}</span>
                    </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="workspace-quiz__footer">
          <button
            type="button"
            className="primary-cta workspace-quiz__next"
            onClick={hasStarted ? handleNext : () => setHasStarted(true)}
            disabled={hasStarted ? !currentValue : false}
            aria-disabled={hasStarted ? !currentValue : false}
          >
            {hasStarted ? ctaLabel : 'Find your Work Hall match'}
            {hasStarted ? <ArrowIcon /> : <ArrowUpRight className="workspace-quiz__cta-icon" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  )
}
