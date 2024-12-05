from pulp import LpMaximize, LpProblem, LpVariable, PULP_CBC_CMD
import sys
import json

def obtener_pesos(valor: float):
    if valor < 0 or valor > 1:
        raise ValueError("El valor debe estar entre 0 y 1.")
    
    # Calcular los pesos
    peso_facil = 1 - valor  # A medida que valor aumenta, peso_facil disminuye
    peso_intermedio = 1 - abs(0.5 - valor) * 2  # Peso intermedio es más alto cerca de 0.5
    peso_dificil = valor  # A medida que valor aumenta, peso_dificil aumenta

    # Normalizar los pesos para que sumen 1
    total_peso = peso_facil + peso_intermedio + peso_dificil
    return {
        'facil': peso_facil / total_peso,
        'intermedia': peso_intermedio / total_peso,
        'dificil': peso_dificil / total_peso
    }

def generate_test(priority_factor, total_questions):
    """
    Genera un conjunto de preguntas ajustado para maximizar el conocimiento total
    con restricciones sobre el número total de preguntas y las dificultades.
    :param priority_factor: Factor entre 0.1 y 1 para ajustar la prioridad de las preguntas.
    :param total_questions: Número total de preguntas en el test.
    :return: Diccionario con el número de preguntas por tipo, el conocimiento total y el peso de la dificultad.
    """
    # Pesos predeterminados de las dificultades
    difficulty_weights = obtener_pesos(priority_factor)  # Usar la función obtener_pesos

    adjusted_weights = difficulty_weights  # Ahora obtenemos los pesos directamente desde obtener_pesos

    # Crear el modelo de programación lineal
    model = LpProblem(name="maximizar_conocimiento", sense=LpMaximize)

    # Definir las variables de cantidad de preguntas (de cada tipo)
    x1 = LpVariable("preguntas_faciles", lowBound=0, cat="Integer")  # Preguntas fáciles
    x2 = LpVariable("preguntas_intermedias", lowBound=0, cat="Integer")  # Preguntas intermedias
    x3 = LpVariable("preguntas_dificiles", lowBound=0, cat="Integer")  # Preguntas difíciles

    # Función objetivo: Maximizar el conocimiento total ponderado por los pesos ajustados
    model += (adjusted_weights['facil'] * x1 +
              adjusted_weights['intermedia'] * x2 +
              adjusted_weights['dificil'] * x3), "Maximizar_conocimiento"

    # Restricción sobre el número total de preguntas
    model += x1 + x2 + x3 == total_questions, "Restricción_total_preguntas"

    # Asegurarse de que haya al menos una pregunta de cada tipo
    model += x1 >= 1, "Min_preguntas_faciles"
    model += x2 >= 1, "Min_preguntas_intermedias"
    
    # Asegurarse de que haya al menos preguntas difíciles, ajustando según priority_factor
    min_dificiles = max(1, int(total_questions * (priority_factor / 2)))  # Al menos una pregunta difícil, pero más si priority_factor es alto
    model += x3 >= min_dificiles, "Min_preguntas_dificiles"

    # Ajustar la restricción de preguntas difíciles dinámicamente
    max_dificiles = int(total_questions * priority_factor)  # Ajuste basado en el factor de prioridad
    model += x3 <= max_dificiles, "Max_preguntas_dificiles"

    # Resolver el modelo
    model.solve(PULP_CBC_CMD(msg=False))

    # Si no se encuentra solución, retornar 0 en todo
    if model.status != 1:
        return {
            'preguntas_faciles': 0,
            'preguntas_intermedias': 0,
            'preguntas_dificiles': 0,
            'conocimiento_total': 0,
            'peso_dificultad': (1, 1, 1)  # Devuelve un peso por defecto
        }

    # Resultados
    result = {
        'preguntas_faciles': int(x1.value()),  # Asegurar que se devuelvan enteros
        'preguntas_intermedias': int(x2.value()),
        'preguntas_dificiles': int(x3.value()),
        'conocimiento_total': model.objective.value(),
        'peso_dificultad': (adjusted_weights['facil'], adjusted_weights['intermedia'], adjusted_weights['dificil'])
    }

    return result

if __name__ == "__main__":
    # Leer los argumentos de la línea de comandos
    priority_factor = float(sys.argv[1])  # Factor entre 0.1 y 1 para ajustar la prioridad
    total_questions = int(sys.argv[2])  # Total de preguntas que debe tener el test

    # Generar el resultado
    result = generate_test(priority_factor, total_questions)

    # Imprimir solo el JSON con el peso de las dificultades
    print(json.dumps(result))
