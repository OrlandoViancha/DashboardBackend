const queries = [
   `
   SELECT sum(cantidad_producto) as productos_vendidos from detalles_pedidos
   `,
   `
   SELECT count(*) as total_pedidos from pedidos
   `,
   `
   select avg(pedidos_hechos) as prom_ped_anio from
   (SELECT extract(year from fecha_pedido) as anio, count(*) as pedidos_hechos from pedidos
   group by extract(year from fecha_pedido) )
   `,
   `SELECT round(sum(subtotal)) as total_ingresos from (
   SELECT dp.id_pedido as pedido, sum((dp.cantidad_producto*p.precio_unidad_producto)*(1-dp.descuento)) as subtotal from detalles_pedidos dp
   join productos p on dp.id_producto = p.id_producto
   group by dp.id_pedido)`,
   `
   select 
p.nombre_producto as nombre,
count(*) as cantidad
from detalles_pedidos det
join productos p on det.id_producto = p.id_producto
group by p.nombre_producto
order by cantidad desc
fetch first 10 row only
   `,

   `SELECT *
   from(
   select c.nombre_compania_cliente as nombre,count(*) as cantidad,
      DENSE_RANK() OVER(ORDER BY count(*) DESC) AS top from pedidos p
      join  clientes c on p.id_cliente = c.id_cliente
      group by c.nombre_compania_cliente)
      WHERE top <= 3`,

   `select extract(month from fecha_pedido) as mes_pedido, count(*) as cantidad_pedidos from pedidos
   group by extract(month from fecha_pedido)
   order by mes_pedido`,

   `select  
      case 
      when forma_pago_pedido ='E'THEN 'Efectivo'
      else 'Credito'
      end as forma_pago
      ,count(*) pedidos
      from pedidos
      group by forma_pago_pedido
   `,
   `
    select extract(year from fecha_pedido) as anio_pedido, count(*) as cantidad_pedidos from pedidos
 group by extract(year from fecha_pedido)
 order by anio_pedido
    `
   ,
   `SELECT p.nombre_producto as name,SUM(det.cantidad_producto) AS value,
   RANK() OVER (ORDER BY SUM(det.cantidad_producto) DESC) AS ranking_productos 
   FROM detalles_pedidos det
   JOIN productos p ON det.id_producto=p.id_producto
   GROUP BY det.id_producto, p.nombre_producto
   ORDER BY SUM(det.cantidad_producto) DESC
   FETCH FIRST 5 ROWS ONLY
      `,
   `
   SELECT c.nombre_categoria as nombre,sum(dp.cantidad_producto) as cantidad from detalles_pedidos dp
   join productos p on dp.id_producto = p.id_producto
   join categorias c on p.id_categoria= c.id_categoria
   group by c.nombre_categoria
   order by cantidad desc
   FETCH FIRST 4 ROWS ONLY
   `
]

module.exports = { queries };