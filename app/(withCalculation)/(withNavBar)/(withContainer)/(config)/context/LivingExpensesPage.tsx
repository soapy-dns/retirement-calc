import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { LivingExpensesEdit } from "./LivingExpensesEdit"

export const LivingExpensesPage: React.FC = () => {
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <div className=" flex flex-col items-center text-primary">
        <Button onClick={handleBack} buttonType={ButtonType.secondary}>
          <div className="flex items-center gap-2">
            <ChevronDoubleLeftIcon className="h-4 w-4" />
            <div>Back to context</div>
          </div>
        </Button>
        <h1 className="mt-4">Living expenses</h1>
      </div>

      <LivingExpensesEdit />
    </>
  )
}
