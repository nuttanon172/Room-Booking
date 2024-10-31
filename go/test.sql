SELECT er.id, er.name, m.name
		FROM employee_role er
		JOIN permission p ON er.id = p.employee_role_id
		JOIN menu m ON p.menu_id = m.id
		ORDER BY er.id, m.id;