import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function HomePage() {
  const dummyData = {
    balance: {
      totalValue: 15234.50,
      unrealizedPnl: 892.30,
      availableBalance: 4521.20
    },
    positions: [
      {
        token: 'BTC',
        bought: 48250.00,
        sold: 52100.00,
        remaining: 0.5,
        pnl: 1925.00,
      },
      {
        token: 'ETH',
        bought: 2800.00,
        sold: 2750.00,
        remaining: 2.5,
        pnl: -125.00,
      },
      {
        token: 'SOL',
        bought: 98.50,
        sold: 105.20,
        remaining: 25,
        pnl: 167.50,
      }
    ]
  }

  // Add chart data
  const chartData = [
    { time: '00:00', value: 12400 },
    { time: '04:00', value: 13100 },
    { time: '08:00', value: 12800 },
    { time: '12:00', value: 13400 },
    { time: '16:00', value: 14100 },
    { time: '20:00', value: 15200 },
    { time: '24:00', value: 15234.50 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1C1F26] border border-gray-800 p-2 text-sm">
          <p className="text-gray-400">{`Time: ${label}`}</p>
          <p className="text-white font-medium">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

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
                  <div className="text-2xl font-medium">{formatCurrency(dummyData.balance.totalValue)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Unrealized PNL</div>
                  <div className={`text-2xl font-medium ${dummyData.balance.unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(dummyData.balance.unrealizedPnl)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Available Balance</div>
                  <div className="text-2xl font-medium">{formatCurrency(dummyData.balance.availableBalance)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PNL Card with Chart */}
          <Card className="bg-[#1C1F26] text-white border-gray-800 lg:col-span-2">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-normal">PNL</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#646CFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#646CFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#646CFF"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
                    {dummyData.positions.map((position, index) => (
                      <tr key={index} className="text-sm border-t border-gray-800">
                        <td className="px-4 py-2 font-medium">{position.token}</td>
                        <td className="px-4 py-2">{formatCurrency(position.bought)}</td>
                        <td className="px-4 py-2">{formatCurrency(position.sold)}</td>
                        <td className="px-4 py-2">{position.remaining}</td>
                        <td className={`px-4 py-2 ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(position.pnl)}
                        </td>
                      </tr>
                    ))}
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