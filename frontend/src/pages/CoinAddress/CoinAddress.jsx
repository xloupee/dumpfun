import { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function CoinAddress() {
    const onLoadScriptRef = useRef();

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => {
            onLoadScriptRef.current = null;
        };

        function createWidget() {
            if (document.getElementById('tradingview_chart') && 'TradingView' in window) {
                new window.TradingView.widget({
                    autosize: true,
                    symbol: "BINANCE:BTCUSDT",
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#1C1F26",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_chart",
                    backgroundColor: "#1C1F26",
                    textColor: "#FFFFFF",
                    gridColor: "#2A2E39",
                    studies_overrides: {
                        "volume.volume.color.0": "#ef5350",
                        "volume.volume.color.1": "#26a69a",
                    },
                    overrides: {
                        // Main chart background and grid
                        "paneProperties.background": "#1C1F26",
                        "paneProperties.vertGridProperties.color": "#2A2E39",
                        "paneProperties.horzGridProperties.color": "#2A2E39",

                        // Text and scale colors
                        "scalesProperties.textColor": "#6B7280",
                        "scalesProperties.backgroundColor": "#1C1F26",

                        // Candlestick colors
                        "mainSeriesProperties.candleStyle.upColor": "#26a69a",
                        "mainSeriesProperties.candleStyle.downColor": "#ef5350",
                        "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
                        "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",

                        // Chart watermark
                        "symbolWatermarkProperties.transparency": 90,
                        "symbolWatermarkProperties.color": "#2A2E39",

                        // Crosshair
                        "crossHairProperties.color": "#6B7280",
                        "crossHairProperties.style": 2,

                        // Legend text
                        "legendProperties.showStudyArguments": true,
                        "legendProperties.showStudyTitles": true,
                        "legendProperties.showStudyValues": true,
                        "legendProperties.showSeriesTitle": true,
                        "legendProperties.showSeriesOHLC": true,
                        "legendProperties.showLegend": true,
                        "legendProperties.showBarChange": true,
                    },
                    loading_screen: {
                        backgroundColor: "#1C1F26",
                        foregroundColor: "#2A2E39"
                    },
                    disabled_features: [
                        "header_symbol_search",
                        "header_screenshot",
                        "header_compare",
                    ],
                    enabled_features: [
                        "hide_left_toolbar_by_default",
                        "move_logo_to_main_pane",
                        "countdown",
                    ],
                });
            }
        }
    }, []);

    return (
        <div className="p-5 h-[calc(100vh-100px)] w-full">
            <div
                id="tradingview_chart"
                className="h-full w-full bg-[#1C1F26] border border-[#2A2E39] rounded-lg shadow-md"
            />
        </div>
    );
};