 
import React, { useState, useEffect } from 'react';
import '../../styles/SalesStats.css';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Necesario para registrar los componentes de Chart.js

const SalesStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // En una app real, harías una llamada a la API para obtener las estadísticas de ventas
        const fetchedStats = {
            totalSales: 1540,
            totalItemsSold: 45,
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
        setStats(fetchedStats);
    }, []);

    if (!stats) {
        return <div className="loading-container">Cargando estadísticas...</div>;
    }

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

            <section className="summary-cards">
                <div className="summary-card">
                    <h3>Ventas Totales</h3>
                    <p className="summary-value">${stats.totalSales}</p>
                </div>
                <div className="summary-card">
                    <h3>Artículos Vendidos</h3>
                    <p className="summary-value">{stats.totalItemsSold}</p>
                </div>
                <div className="summary-card">
                    <h3>Más Popular</h3>
                    <p className="summary-value">{stats.mostPopularItem.name} ({stats.mostPopularItem.salesCount} ventas)</p>
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