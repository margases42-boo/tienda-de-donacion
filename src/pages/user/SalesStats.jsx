
import React, { useState, useEffect } from 'react';
import '../../styles/SalesStats.css';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Necesario para registrar los componentes de Chart.js

const SalesStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // 1. Cambio en el useEffect (Mock Data)
        // Datos iniciales simulados
        const fetchedStats = {
            totalSales: 1540,
            totalItemsSold: 45,
            totalOrders: 38, // 1. Métrica de pedidos agregada
            mostPopularItem: { name: 'Vestido de verano', salesCount: 12 },
            salesByMonth: [
                { month: 'Ene', sales: 120 },
                { month: 'Feb', sales: 180 },
                { month: 'Mar', sales: 250 },
                { month: 'Abr', sales: 300 },
                { month: 'May', sales: 280 },
                { month: 'Jun', sales: 410 },
            ],
            salesByCategory: [
                { category: 'Vestidos', count: 18 },
                { category: 'Pantalones', count: 10 },
                { category: 'Chaquetas', count: 8 },
                { category: 'Camisas', count: 9 },
            ]
        };
        
        // Establecer el estado inicial
        setStats(fetchedStats);

        // 2. Cambio en el useEffect (Lógica de Simulación)
        // Simular actualización de datos cada 3 segundos
        const interval = setInterval(() => {
            setStats(prevStats => {
                // Si el estado anterior no existe, no hagas nada
                if (!prevStats) return null;

                // Simular nuevos datos
                const newSales = prevStats.totalSales + Math.floor(Math.random() * 50) + 10;
                const newOrders = prevStats.totalOrders + 1;
                const newItems = prevStats.totalItemsSold + Math.floor(Math.random() * 3) + 1;

                // Simular actualización del último mes en el gráfico de barras
                const newSalesByMonth = [...prevStats.salesByMonth];
                const lastMonthIndex = newSalesByMonth.length - 1;
                
                // Actualizar las ventas del último mes
                newSalesByMonth[lastMonthIndex] = {
                    ...newSalesByMonth[lastMonthIndex],
                    sales: newSalesByMonth[lastMonthIndex].sales + Math.floor(Math.random() * 30) + 5
                };

                return {
                    ...prevStats,
                    totalSales: newSales,
                    totalOrders: newOrders,
                    totalItemsSold: newItems,
                    salesByMonth: newSalesByMonth
                };
            });
        }, 3000); // Actualiza cada 3 segundos

        // Detener la simulación cuando el componente se desmonte
        return () => clearInterval(interval);

    }, []); // El array vacío asegura que esto se ejecute solo una vez (al montar)

    if (!stats) {
        return <div className="loading-container">Cargando estadísticas...</div>;
    }

    // --- Configuración de Gráficos (sin cambios) ---
    const monthlySalesData = {
        labels: stats.salesByMonth.map(item => item.month),
        datasets: [{
            label: 'Ventas por Mes ($)',
            data: stats.salesByMonth.map(item => item.sales),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    };

    const categorySalesData = {
        labels: stats.salesByCategory.map(item => item.category),
        datasets: [{
            label: 'Ventas por Categoría',
            data: stats.salesByCategory.map(item => item.count),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        }]
    };

    return (
        <div className="sales-stats-container">
            <header className="stats-header">
                <h1>📈 Estadísticas de Ventas</h1>
                <p>Análisis detallado de tu desempeño como vendedor.</p>
            </header>

            {/* 2. Cambio en la Interfaz (UI) - Tarjetas actualizadas */}
            <section className="summary-cards">
                <div className="summary-card">
                    <h3>Ventas Totales</h3>
                    {/* Clase "sales" añadida */}
                    <p className="summary-value sales">${stats.totalSales}</p>
                </div>
                
                {/* Tarjeta "Número de Pedidos" AÑADIDA */}
                <div className="summary-card">
                    <h3>Número de Pedidos</h3>
                    {/* Clase "orders" añadida */}
                    <p className="summary-value orders">{stats.totalOrders}</p>
                </div>

                <div className="summary-card">
                    <h3>Artículos Vendidos</h3>
                    {/* Clase "items" añadida */}
                    <p className="summary-value items">{stats.totalItemsSold}</p>
                </div>
                
                <div className="summary-card">
                    <h3>Más Popular</h3>
                    {/* Clase "popular" añadida */}
                    <p className="summary-value popular">{stats.mostPopularItem.name} ({stats.mostPopularItem.salesCount} ventas)</p>
                </div>
            </section>

            <section className="charts-section">
                <div className="chart-card">
                    <h2>Ventas Mensuales</h2>
                    <Bar data={monthlySalesData} />
                </div>
                <div className="chart-card">
                    <h2>Ventas por Categoría</h2>
                    <Pie data={categorySalesData} />
                </div>
            </section>
        </div>
    );
};

export default SalesStats;
