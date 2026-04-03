import { PageContainer } from '../../../shared/components/page-container'
import { FeedbackFiltersBar } from '../components/feedback-filters-bar'
import { FeedbackList } from '../components/feedback-list'
import { FeedbackStats } from '../components/feedback-stats'
import { useFeedbackPage } from '../hooks/use-feedback-page'

export function FeedbackPage() {
  const {
    archiveFeedback,
    deleteFeedback,
    feedbackItems,
    filteredCountLabel,
    hasActiveFilters,
    markAsRead,
    resetFilters,
    searchValue,
    setSearchValue,
    setStatus,
    setType,
    stats,
    status,
    totalCountLabel,
    type,
    unreadCountLabel,
  } = useFeedbackPage()

  return (
    <PageContainer>

      <FeedbackStats stats={stats} />

      <FeedbackFiltersBar
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
        onSearchChange={setSearchValue}
        onStatusChange={setStatus}
        onTypeChange={setType}
        searchValue={searchValue}
        status={status}
        type={type}
      />

      <FeedbackList
        filteredCountLabel={filteredCountLabel}
        hasActiveFilters={hasActiveFilters}
        items={feedbackItems}
        onArchive={archiveFeedback}
        onDelete={deleteFeedback}
        onMarkAsRead={markAsRead}
        totalCountLabel={totalCountLabel}
        unreadCountLabel={unreadCountLabel}
      />
    </PageContainer>
  )
}
