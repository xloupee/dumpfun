import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0D1117] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#161B22] px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl">dump.fun</h1>
            <nav className="flex space-x-4">
              <Button variant="ghost" className="h-8 px-3 text-white hover:text-white hover:bg-gray-800">Spot</Button>
              <Button variant="ghost" className="h-8 px-3 text-white hover:text-white hover:bg-gray-800">Perpetuals</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="h-8 bg-white text-black hover:bg-gray-100">Deposit</Button>
            <Button variant="ghost" className="h-8 text-white hover:text-white hover:bg-gray-800">Rewards</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg">Your holdings</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="h-7 px-3 text-white hover:text-white hover:bg-gray-800">7d</Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-white hover:text-white hover:bg-gray-800">30d</Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-white hover:text-white hover:bg-gray-800">Max</Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Balance Card */}
          <Card className="bg-[#1C1F26] text-white border-gray-800">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-normal">Balance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-400">Total Value</div>
                  <div className="text-2xl font-medium">$0</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Unrealized PNL</div>
                  <div className="text-2xl font-medium">$0</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Available Balance</div>
                  <div className="text-2xl font-medium">$0</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PNL Card */}
          <Card className="bg-[#1C1F26] text-white border-gray-800 lg:col-span-2">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-normal">PNL</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[240px] flex items-center justify-center text-gray-500">
                No data to display
              </div>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card className="bg-[#1C1F26] text-white border-gray-800 lg:col-span-3">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-normal">Active Positions</CardTitle>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="h-7 px-3 text-gray-400 hover:text-white hover:bg-gray-800">
                    History
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-3 text-gray-400 hover:text-white hover:bg-gray-800">
                    Top 100
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs text-gray-400">
                    <tr>
                      <th className="px-4 py-2">Token</th>
                      <th className="px-4 py-2">Bought</th>
                      <th className="px-4 py-2">Sold</th>
                      <th className="px-4 py-2">Remaining</th>
                      <th className="px-4 py-2">PnL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-500">
                      <td className="px-4 py-2" colSpan="5">No active positions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 