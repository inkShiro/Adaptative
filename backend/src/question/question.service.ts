import { Injectable, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class QuestionService {
  async generateTest(previousPerformance: number, totalQuestions: number): Promise<any> {
    return new Promise((resolve, reject) => {
      // Ruta absoluta al script Python
      const scriptPath = 'scripts/generate_test.py';

      // Comando para ejecutar el script con parámetros
      const command = `python3 ${scriptPath} ${previousPerformance} ${totalQuestions}`;

      // Ejecutar el script Python
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`exec error: ${error}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        try {
          // Parsear la salida del script Python
          resolve(JSON.parse(stdout));
        } catch (e) {
          reject(`Error parsing output: ${e.message}`);
        }
      });
    });
  }

  generateQuestion(concept: string, type: number, learningStyle: string, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (learningStyle.toLowerCase()) {
      case 'visual':
        return this.generateVisualQuestion(concept, type, difficultyWeights);
  
      case 'auditivo':
        return this.generateAuditoryQuestion(concept, type, difficultyWeights);
  
      case 'kinestesico':
        return this.generateKinestheticQuestion(concept, type, difficultyWeights);
  
      case 'lectura-escritura':
        return this.generateReadingWritingQuestion(concept, type, difficultyWeights);
  
      case 'secuencial':
        return this.generateSequentialQuestion(concept, type, difficultyWeights);
  
      case 'global':
        return this.generateGlobalQuestion(concept, type, difficultyWeights);
  
      case 'activo':
        return this.generateActiveQuestion(concept, type, difficultyWeights);
  
      case 'reflexivo':
        return this.generateReflectiveQuestion(concept, type, difficultyWeights);
  
      case 'social':
        return this.generateSocialQuestion(concept, type, difficultyWeights);
  
      case 'individual':
        return this.generateIndividualQuestion(concept, type, difficultyWeights);
  
      default:
        throw new NotFoundException('Estilo de aprendizaje no soportado');
    }
  }

  generateVisualQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumVisualQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionVisualQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateAuditoryQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumAuditoryQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionAuditoryQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateKinestheticQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumKinestheticQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionKinestheticQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateReadingWritingQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumReadingWritingQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionReadingWritingQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateSequentialQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumSequentialQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionSequentialQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateGlobalQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumGlobalQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionGlobalQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateActiveQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumActiveQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionActiveQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateReflectiveQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumReflectiveQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionReflectiveQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateSocialQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumSocialQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionSocialQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }
  
  generateIndividualQuestion(concept: string, type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    switch (concept.toLowerCase()) {
      case 'suma':
        return this.generateSumIndividualQuestion(type, difficultyWeights);
  
      case 'resta':
        return this.generateSubtractionIndividualQuestion(type, difficultyWeights);
  
      default:
        throw new NotFoundException('Concepto no soportado');
    }
  }

  private generateSumVisualQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Ajusta el rango de los números según la dificultad
        const maxBarValue = 10 * difficulty;
        const redBar = Math.floor(Math.random() * maxBarValue + 1);
        const blueBar = Math.floor(Math.random() * maxBarValue + 1);
        const correctAnswer = redBar + blueBar;
        const options = this.generateOptions(correctAnswer);
        return {
          question: `Mira el gráfico de barras y suma los valores de las barras roja y azul. ¿Cuál es el total?`,
          bars: { redBar, blueBar },
          options,
          correctAnswer,
          explanation: `La suma de las barras roja (${redBar}) y azul (${blueBar}) es ${correctAnswer}.`,
          difficulty,
          typeLabel: 'gráfico',
        };
  
      case 2:
        // Ajusta el rango de los números y la cantidad de puntos según la dificultad
        const maxGroupValue = 20 * difficulty;
        const group1Points = Math.floor(Math.random() * maxGroupValue + 1);
        const group2Points = Math.floor(Math.random() * maxGroupValue + 1);
        const totalPoints = group1Points + group2Points;
        const group1Coords = this.generateRandomCoordinates(group1Points);
        const group2Coords = this.generateRandomCoordinates(group2Points);
        const options2 = this.generateOptions(totalPoints);
        return {
          question: `En la siguiente imagen, cuenta el total de puntos en dos grupos y súmalos.`,
          points: { group1: group1Coords, group2: group2Coords },
          options: options2,
          correctAnswer: totalPoints,
          explanation: `El total de puntos es ${totalPoints} porque el grupo 1 tiene ${group1Points} puntos y el grupo 2 tiene ${group2Points} puntos.`,
          difficulty,
          typeLabel: 'grupo_puntos',
        };
  
        case 3:
          // Ajusta el rango de los números según la dificultad
          const maxNumberValue = 20 * difficulty;
          const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * maxNumberValue + 1));
          const targetSum3 = numbers[0] + numbers[1];
          numbers[0] = targetSum3 - Math.floor(Math.random() * 10 + 1); // Asegura al menos una combinación correcta
        
          return {
            question: `Observa el siguiente cuadro numérico y encuentra dos números que sumen ${targetSum3}.`,
            numbers,
            correctAnswer: [numbers[0], numbers[1]],
            explanation: `En el cuadro, los números que suman ${targetSum3} son ${numbers[0]} y ${numbers[1]}.`,
            difficulty,
            typeLabel: 'cuadro_numérico',
          };
          
          case 4:

          // Ajusta el rango de los números según la dificultad
          const set1Size = Math.floor(Math.random() * (10 * difficulty) + 1);
          const set2Size = Math.floor(Math.random() * (10 * difficulty) + 1);
          const totalSize = set1Size + set2Size;

          return {
            question: `Observa los dos conjuntos representados en el diagrama y suma el total de elementos. ¿Cuál es el total?`,
            diagram: {
              set1: Array.from({ length: set1Size }, (_, i) => i + 1), // Ejemplo de elementos del primer conjunto
              set2: Array.from({ length: set2Size }, (_, i) => i + 1), // Ejemplo de elementos del segundo conjunto
            },
            correctAnswer: totalSize,
            explanation: `El total de elementos en los dos conjuntos es ${totalSize}, porque el primer conjunto tiene ${set1Size} elementos y el segundo conjunto tiene ${set2Size} elementos.`,
            difficulty,
            typeLabel: 'conjuntos',
          };

          case 5:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const num1 = Math.floor(Math.random() * (20 * difficulty) + 1);
          const num2 = Math.floor(Math.random() * (20 * difficulty) + 1);
          const targetSum5 = num1 + num2;

          return {
            question: `Completa el mapa conceptual observando los bloques numéricos y encuentra la suma total.`,
            blocks: [
              { label: `Bloque 1: ${num1}`, value: num1 },
              { label: `Bloque 2: ${num2}`, value: num2 },
            ],
            correctAnswer: targetSum5,
            explanation: `En el mapa conceptual, los bloques con valores ${num1} y ${num2} suman un total de ${targetSum5}.`,
            difficulty,
            typeLabel: 'bloques_numéricos',
          };
          
          case 6:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const numApples = Math.floor(Math.random() * (5 * difficulty) + 1);
          const numOranges = Math.floor(Math.random() * (5 * difficulty) + 1);
          const totalFruits = numApples + numOranges;

          return {
            question: `Observa la imagen que muestra ${numApples} manzanas y ${numOranges} naranjas. ¿Cuál es el total de frutas?`,
            image: {
              apples: numApples,
              oranges: numOranges,
            },
            correctAnswer: totalFruits,
            explanation: `El total de frutas es ${totalFruits}, ya que hay ${numApples} manzanas y ${numOranges} naranjas.`,
            difficulty,
            typeLabel: 'frutas',
          };

          case 7:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const numCircles = Math.floor(Math.random() * (5 * difficulty) + 1);
          const numSquares = Math.floor(Math.random() * (5 * difficulty) + 1);
          const totalShapes = numCircles + numSquares;

          return {
            question: `Mira el diagrama con círculos y cuadrados. ¿Cuántas figuras hay en total?`,
            diagram: {
              circles: numCircles,
              squares: numSquares,
            },
            correctAnswer: totalShapes,
            explanation: `En el diagrama hay un total de ${totalShapes} figuras, con ${numCircles} círculos y ${numSquares} cuadrados.`,
            difficulty,
            typeLabel: 'diagrama',
          };

          case 8:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const puzzle1Pieces = Math.floor(Math.random() * (10 * difficulty) + 1);
          const puzzle2Pieces = Math.floor(Math.random() * (10 * difficulty) + 1);
          const totalPieces = puzzle1Pieces + puzzle2Pieces;

          return {
            question: `Observa los dos puzzles. ¿Cuántas piezas hay en total si el primer puzzle tiene ${puzzle1Pieces} piezas y el segundo tiene ${puzzle2Pieces} piezas?`,
            puzzles: [
              { label: `Puzzle 1`, pieces: puzzle1Pieces },
              { label: `Puzzle 2`, pieces: puzzle2Pieces },
            ],
            correctAnswer: totalPieces,
            explanation: `El total de piezas de los dos puzzles es ${totalPieces}, sumando ${puzzle1Pieces} y ${puzzle2Pieces}.`,
            difficulty,
            typeLabel: 'puzzles',
          };

          case 9:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const card1Value = Math.floor(Math.random() * (15 * difficulty) + 1);
          const card2Value = Math.floor(Math.random() * (15 * difficulty) + 1);
          const totalValue = card1Value + card2Value;

          return {
            question: `Mira las tarjetas de números y encuentra la suma de los dos números mostrados. ¿Cuál es la suma total?`,
            cards: [
              { label: `Tarjeta 1: ${card1Value}`, value: card1Value },
              { label: `Tarjeta 2: ${card2Value}`, value: card2Value },
            ],
            correctAnswer: totalValue,
            explanation: `La suma de las dos tarjetas es ${totalValue}, con valores de ${card1Value} y ${card2Value}.`,
            difficulty,
            typeLabel: 'tarjetas',
          };

          case 10:

          // Ajusta los valores de los números de acuerdo a la dificultad
          const numBirds = Math.floor(Math.random() * (10 * difficulty) + 1);
          const numFish = Math.floor(Math.random() * (10 * difficulty) + 1);
          const totalAnimals = numBirds + numFish;

          return {
            question: `En la imagen, hay ${numBirds} pájaros y ${numFish} peces. ¿Cuál es el total de animales en la escena?`,
            image: {
              birds: numBirds,
              fish: numFish,
            },
            correctAnswer: totalAnimals,
            explanation: `En la escena, el total de animales es ${totalAnimals}, con ${numBirds} pájaros y ${numFish} peces.`,
            difficulty,
            typeLabel: 'animales',
          };


      default:
        throw new NotFoundException('Tipo de ejercicio no soportado para suma');
    }
  }
  

  private generateSubtractionVisualQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {

    const difficulty = this.calculateDifficulty(difficultyWeights);
  
    switch (type) {
        case 1:
        // Ajusta el rango de los números según la dificultad
        const maxBarValue = 10 * difficulty;
        const redBar = Math.floor(Math.random() * maxBarValue + 1);
        const blueBar = Math.floor(Math.random() * maxBarValue + 1);
        const correctAnswer = redBar - blueBar; // Correcta resta entre las barras
        const options = this.generateOptions(correctAnswer);

        return {
          question: `Mira el gráfico de barras y calcula la diferencia entre el valor de la barra roja (${redBar}) y la barra azul (${blueBar}). ¿Cuál es el resultado?`,
          bars: { redBar, blueBar },
          options,
          correctAnswer,
          explanation: `La diferencia entre las barras roja (${redBar}) y azul (${blueBar}) es ${correctAnswer}.`,
          difficulty,
          typeLabel: 'gráfico',
        };

  
        case 2:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const totalItems = Math.floor(Math.random() * (15 * difficulty) + 1);
        const removedItems = Math.floor(Math.random() * (5 * difficulty) + 1);
        const remainingItems = totalItems - removedItems;

        return {
          question: `Observa la imagen con ${totalItems} elementos. Si se quitan ${removedItems} elementos, ¿cuántos quedan?`,
          image: {
            total: totalItems,
            removed: removedItems,
          },
          correctAnswer: remainingItems,
          explanation: `Después de quitar ${removedItems} elementos de ${totalItems}, quedan ${remainingItems} elementos.`,
          difficulty,
          typeLabel: 'elementos',
        };


        case 3:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const initialLength = Math.floor(Math.random() * (20 * difficulty) + 10);
        const reducedLength = Math.floor(Math.random() * (10 * difficulty) + 1);
        const remainingLength = initialLength - reducedLength;

        return {
          question: `Mira el gráfico de la barra que representa un objeto de ${initialLength} unidades. Si se reduce en ${reducedLength} unidades, ¿cuál es la longitud restante?`,
          bar: {
            initial: initialLength,
            reduced: reducedLength,
          },
          correctAnswer: remainingLength,
          explanation: `La longitud restante es ${remainingLength} unidades después de reducir ${reducedLength} unidades de ${initialLength}.`,
          difficulty,
          typeLabel: 'grafico',
        };

        case 4:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const totalBlocks = Math.floor(Math.random() * (15 * difficulty) + 5);
        const usedBlocks = Math.floor(Math.random() * (5 * difficulty) + 1);
        const remainingBlocks = totalBlocks - usedBlocks;

        return {
          question: `En un puzzle hay ${totalBlocks} bloques. Si se usan ${usedBlocks} bloques, ¿cuántos quedan?`,
          puzzle: {
            total: totalBlocks,
            used: usedBlocks,
          },
          correctAnswer: remainingBlocks,
          explanation: `Después de usar ${usedBlocks} bloques de ${totalBlocks}, quedan ${remainingBlocks} bloques.`,
          difficulty,
          typeLabel: 'bloques',
        };

        case 5:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const initialCoins = Math.floor(Math.random() * (10 * difficulty) + 5);
        const spentCoins = Math.floor(Math.random() * (5 * difficulty) + 1);
        const remainingCoins = initialCoins - spentCoins;

        return {
          question: `En la historia, tienes ${initialCoins} monedas. Si gastas ${spentCoins} monedas, ¿cuántas te quedan?`,
          image: {
            initial: initialCoins,
            spent: spentCoins,
          },
          correctAnswer: remainingCoins,
          explanation: `Si gastas ${spentCoins} monedas de ${initialCoins}, quedan ${remainingCoins} monedas.`,
          difficulty,
          typeLabel: 'monedas',
        };

        case 7:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const initialHeight = Math.floor(Math.random() * (50 * difficulty) + 10);
        const decreasedHeight = Math.floor(Math.random() * (20 * difficulty) + 1);
        const newHeight = initialHeight - decreasedHeight;

        return {
          question: `Mira el gráfico de líneas que representa la altura de un objeto. Si la altura se reduce en ${decreasedHeight} unidades, ¿cuál es la nueva altura?`,
          chart: {
            initial: initialHeight,
            decrease: decreasedHeight,
          },
          correctAnswer: newHeight,
          explanation: `La nueva altura es ${newHeight} unidades después de reducir ${decreasedHeight} unidades de ${initialHeight}.`,
          difficulty,
          typeLabel: 'grafico',
        };

        case 8:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const initialBarLength = Math.floor(Math.random() * (30 * difficulty) + 10);
        const removedPart = Math.floor(Math.random() * (15 * difficulty) + 1);
        const remainingPart = initialBarLength - removedPart;

        return {
          question: `Observa el diagrama de barras horizontales y calcula la longitud restante de la barra después de quitar ${removedPart} unidades.`,
          bar: {
            initialLength: initialBarLength,
            removed: removedPart,
          },
          correctAnswer: remainingPart,
          explanation: `La longitud restante de la barra es ${remainingPart} unidades después de quitar ${removedPart} unidades de ${initialBarLength}.`,
          difficulty,
          typeLabel: 'barras',
        };

        case 9:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const totalObjects = Math.floor(Math.random() * (10 * difficulty) + 1);
        const removedObjects = Math.floor(Math.random() * (5 * difficulty) + 1);
        const remainingObjects = totalObjects - removedObjects;

        return {
          question: `En la imagen hay ${totalObjects} objetos en total. Si se eliminan ${removedObjects} objetos, ¿cuántos quedan?`,
          image: {
            totalObjects: totalObjects,
            removedObjects: removedObjects,
          },
          correctAnswer: remainingObjects,
          explanation: `Quedan ${remainingObjects} objetos después de quitar ${removedObjects} de los ${totalObjects}.`,
          difficulty,
          typeLabel: 'objetos',
        };

        case 10:

        // Ajusta los valores de los números de acuerdo a la dificultad
        const totalIcons = Math.floor(Math.random() * (20 * difficulty) + 1);
        const removedIcons = Math.floor(Math.random() * (10 * difficulty) + 1);
        const remainingIcons = totalIcons - removedIcons;

        return {
          question: `En el pictograma hay ${totalIcons} íconos. Si se eliminan ${removedIcons} íconos, ¿cuántos íconos quedan?`,
          pictogram: {
            total: totalIcons,
            removed: removedIcons,
          },
          correctAnswer: remainingIcons,
          explanation: `Después de eliminar ${removedIcons} íconos de los ${totalIcons} del pictograma, quedan ${remainingIcons} íconos.`,
          difficulty,
          typeLabel: 'pictograma',
        };
  
      default:
        throw new NotFoundException('Tipo de ejercicio no soportado para resta');
    }
  }

  private generateSubtractionAuditoryQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con números pequeños
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Escucha bien: ¿Cuál es el resultado de restar ${smallNum2} de ${smallNum1}?`,
          audio: `audio/resta_simple_${smallNum1}_${smallNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options,
          correctAnswer: smallSubtraction,
          explanation: `La respuesta correcta es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Los estudiantes auditivos pueden mejorar su comprensión de las restas a través de la escucha repetitiva de las operaciones.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Escucha cuidadosamente: ¿Cuál es el resultado de restar ${mediumNum2} de ${mediumNum1}?`,
          audio: `audio/resta_moderada_${mediumNum1}_${mediumNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. La repetición de operaciones auditivas puede ayudar a los estudiantes auditivos a retener mejor los resultados.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Escucha bien esta vez: ¿Cuál es el resultado de restar ${largeNum2} de ${largeNum1}?`,
          audio: `audio/resta_grande_${largeNum1}_${largeNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `La respuesta correcta es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Los estudiantes auditivos pueden procesar y recordar operaciones matemáticas de manera efectiva cuando las escuchan en lugar de verlas visualmente.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje auditivo.');
    }
  }

  private generateSubtractionKinestheticQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con números pequeños
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Realiza la siguiente acción física: Tienes ${smallNum1} objetos en una mano. Saca ${smallNum2} objetos de esa mano. ¿Cuántos objetos te quedan?`,
          action: `Saca ${smallNum2} objetos de los ${smallNum1} que tienes en la mano. Cuenta cuántos objetos quedan.`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `La respuesta correcta es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este tipo de actividad permite que los estudiantes kinestésicos aprendan de manera física a través de la manipulación de objetos.`,
          difficulty,
          typeLabel: 'kinestésico',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Realiza esta acción física: Tienes ${mediumNum1} pelotitas en una caja. Saca ${mediumNum2} pelotitas de la caja. ¿Cuántas pelotitas quedan en la caja?`,
          action: `Saca ${mediumNum2} pelotitas de la caja que contiene ${mediumNum1} pelotitas. Cuenta cuántas pelotitas quedan en la caja.`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Este ejercicio práctico ayuda a los estudiantes kinestésicos a comprender mejor el concepto de resta al realizar la acción física de quitar elementos.`,
          difficulty,
          typeLabel: 'kinestésico',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Haz esta actividad kinestésica: Tienes ${largeNum1} bloques en un montón. Quita ${largeNum2} bloques del montón. ¿Cuántos bloques quedan?`,
          action: `Quita ${largeNum2} bloques del montón que contiene ${largeNum1} bloques. Luego cuenta los bloques que quedan en el montón.`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `La respuesta correcta es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. A través de la acción física de quitar bloques, los estudiantes kinestésicos comprenden mejor la operación de la resta.`,
          difficulty,
          typeLabel: 'kinestésico',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje kinestésico.');
    }
  }

  private generateSubtractionReadingWritingQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con números pequeños
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Lee la siguiente operación de resta y resuélvela: ${smallNum1} - ${smallNum2}. ¿Cuál es el resultado?`,
          prompt: `Escribe la respuesta correcta a la resta ${smallNum1} - ${smallNum2}.`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `La respuesta correcta es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este ejercicio de lectura y escritura permite que los estudiantes practiquen la resta al leer y escribir la operación.`,
          difficulty,
          typeLabel: 'lectura_escritura',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Lee la siguiente operación de resta: ${mediumNum1} - ${mediumNum2}. Escribe el resultado de la resta.`,
          prompt: `Escribe el resultado de la operación de resta ${mediumNum1} - ${mediumNum2}.`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Este ejercicio permite practicar la resta mediante la lectura y escritura de la operación.`,
          difficulty,
          typeLabel: 'lectura_escritura',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Lee y resuelve la siguiente operación: ${largeNum1} - ${largeNum2}. ¿Cuál es la respuesta?`,
          prompt: `Escribe la respuesta correcta a la resta ${largeNum1} - ${largeNum2}.`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `La respuesta correcta es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. A través de la lectura y escritura, este ejercicio facilita el aprendizaje de la resta en operaciones con números más grandes.`,
          difficulty,
          typeLabel: 'lectura_escritura',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje de lectura y escritura.');
    }
  }

  private generateSubtractionSequentialQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con pasos secuenciales
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Realiza la siguiente operación paso a paso: ${smallNum1} - ${smallNum2}. ¿Cuál es el resultado?`,
          prompt: `Sigue los pasos secuenciales y resuelve la resta ${smallNum1} - ${smallNum2}.`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `El resultado de la operación es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este ejercicio está diseñado para enseñar la secuencia de pasos en la operación de resta.`,
          difficulty,
          typeLabel: 'secuencial',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y un enfoque paso a paso
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Sigue los pasos secuenciales para resolver esta operación: ${mediumNum1} - ${mediumNum2}. ¿Cuál es el resultado final?`,
          prompt: `Escribe la respuesta a la operación de resta ${mediumNum1} - ${mediumNum2} siguiendo los pasos secuenciales.`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `El resultado correcto es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. El proceso secuencial implica comprender cada paso para llegar a la solución.`,
          difficulty,
          typeLabel: 'secuencial',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque en pasos detallados
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Sigue los pasos detallados para resolver esta operación de resta: ${largeNum1} - ${largeNum2}. ¿Cuál es el resultado?`,
          prompt: `Escribe la respuesta correcta de la operación ${largeNum1} - ${largeNum2} paso a paso.`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Este ejercicio está diseñado para estudiantes que aprenden mejor siguiendo un enfoque paso a paso para resolver problemas.`,
          difficulty,
          typeLabel: 'secuencial',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje secuencial.');
    }
  }

  private generateSubtractionGlobalQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Enfoque global para una resta simple
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `En esta operación, observa el problema globalmente: ${smallNum1} - ${smallNum2}. ¿Cuál es el resultado final?`,
          globalView: `Mira la operación como un todo, ¿cuál es el resultado de ${smallNum1} - ${smallNum2}?`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `El resultado de la operación es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este ejercicio está diseñado para que puedas ver el problema como un todo, sin enfocarte en detalles aislados.`,
          difficulty,
          typeLabel: 'global',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y enfoque global
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Mira la operación en su totalidad: ${mediumNum1} - ${mediumNum2}. ¿Qué resultado obtienes?`,
          globalView: `Haz una visión global del problema y responde el resultado de ${mediumNum1} - ${mediumNum2}.`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `El resultado correcto es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Este ejercicio ayuda a que puedas percibir el problema en su totalidad antes de resolverlo.`,
          difficulty,
          typeLabel: 'global',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque global
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Visualiza el problema completo: ${largeNum1} - ${largeNum2}. ¿Cuál es el resultado que obtienes al restar?`,
          globalView: `Piensa en la operación en su conjunto: ¿qué resultado tiene ${largeNum1} - ${largeNum2}?`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Este ejercicio está diseñado para ayudar a los estudiantes a visualizar la operación como un todo, sin enfocarse en los pasos individuales.`,
          difficulty,
          typeLabel: 'global',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje global.');
    }
  }
  
  private generateSubtractionActiveQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Enfoque activo con una resta simple
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Realiza la operación: ${smallNum1} - ${smallNum2}. ¿Cuál es el resultado?`,
          activeTask: `Haz la operación de manera activa y responde: ¿cuál es el resultado de ${smallNum1} - ${smallNum2}?`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `El resultado de la operación es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este ejercicio está diseñado para que participes activamente resolviendo la operación de manera práctica.`,
          difficulty,
          typeLabel: 'activo',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y enfoque activo
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Haz la operación activa: ${mediumNum1} - ${mediumNum2}. ¿Cuál es el resultado?`,
          activeTask: `Participa activamente resolviendo: ¿qué resultado obtienes al restar ${mediumNum1} - ${mediumNum2}?`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `El resultado correcto es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Este ejercicio está enfocado en tu participación activa mientras resuelves la resta.`,
          difficulty,
          typeLabel: 'activo',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque activo
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Resuelve activamente la operación: ${largeNum1} - ${largeNum2}. ¿Cuál es el resultado final?`,
          activeTask: `Resuelve activamente y responde: ¿qué es ${largeNum1} - ${largeNum2}?`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Este ejercicio tiene como objetivo promover tu participación activa en el proceso de resolución de restas.`,
          difficulty,
          typeLabel: 'activo',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje activo.');
    }
  }

private generateSubtractionReflectiveQuestion(type: number, difficultyWeights: { 
  preguntas_faciles: number, 
  preguntas_intermedias: number, 
  preguntas_dificiles: number, 
  conocimiento_total: number, 
  peso_dificultad: number[] 
}): any {
    
  const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Enfoque reflexivo con una resta simple
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Piensa cuidadosamente y realiza la operación: ${smallNum1} - ${smallNum2}. ¿Qué resultado obtienes?`,
          reflectiveTask: `Reflexiona sobre la operación ${smallNum1} - ${smallNum2}. ¿Cómo llegaste a tu respuesta? ¿Podrías haber hecho algo diferente para obtener el resultado?`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `El resultado correcto de ${smallNum1} - ${smallNum2} es ${smallSubtraction}. Este ejercicio busca que reflexiones sobre cómo resolver la operación y explores diferentes formas de llegar al mismo resultado.`,
          difficulty,
          typeLabel: 'reflexivo',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y enfoque reflexivo
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Reflexiona antes de resolver la operación: ${mediumNum1} - ${mediumNum2}. ¿Cuál es el resultado final?`,
          reflectiveTask: `Reflexiona sobre la resta ${mediumNum1} - ${mediumNum2}. ¿Hay otras estrategias o métodos que podrías usar para resolver esta operación de forma más eficiente?`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Este ejercicio está diseñado para fomentar una reflexión sobre cómo abordas la resolución de problemas de resta.`,
          difficulty,
          typeLabel: 'reflexivo',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque reflexivo
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Reflexiona sobre la operación: ${largeNum1} - ${largeNum2}. ¿Qué procedimiento seguiste para encontrar el resultado?`,
          reflectiveTask: `Tómate un momento para pensar sobre cómo resolviste ${largeNum1} - ${largeNum2}. ¿Fue la forma en que lo hiciste la mejor manera? ¿Qué aprendiste de esta operación?`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado correcto es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Este ejercicio tiene como objetivo fomentar la reflexión sobre tu proceso de resolución y aprendizaje.`,
          difficulty,
          typeLabel: 'reflexivo',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje reflexivo.');
    }
  }

  private generateSubtractionSocialQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con enfoque social
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Imagina que estás trabajando en equipo. ¿Cómo explicarías la operación ${smallNum1} - ${smallNum2} a un compañero de clase?`,
          socialTask: `Habla con un compañero sobre la operación ${smallNum1} - ${smallNum2}. ¿Qué pasos le dirías que siguiera para resolverla?`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `El resultado correcto es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Al trabajar juntos, puedes discutir diferentes maneras de resolver la operación y asegurarte de que ambos comprendan el proceso.`,
          difficulty,
          typeLabel: 'social',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y enfoque social
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `En un grupo, todos deben resolver ${mediumNum1} - ${mediumNum2}. ¿Cómo podrías colaborar con tus compañeros para encontrar la respuesta?`,
          socialTask: `Trabaja con un compañero para resolver la operación ${mediumNum1} - ${mediumNum2}. Discute las diferentes formas en las que pueden abordar el problema juntos.`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Trabajar en equipo te permite compartir ideas y aprender de los enfoques de los demás para resolver problemas más eficientemente.`,
          difficulty,
          typeLabel: 'social',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque social
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `En una discusión en grupo, ¿cómo explicarías la operación ${largeNum1} - ${largeNum2} para asegurarte de que todos comprendan el proceso?`,
          socialTask: `Colabora con otros para resolver la operación ${largeNum1} - ${largeNum2}. ¿Qué consejos les darías para que comprendieran cómo realizar la resta correctamente?`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado correcto es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Trabajar en grupo fomenta la comunicación, el intercambio de ideas y una comprensión más profunda de las soluciones matemáticas.`,
          difficulty,
          typeLabel: 'social',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje social.');
    }
  }

  private generateSubtractionIndividualQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resta simple con enfoque individual
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSubtraction = smallNum1 - smallNum2;
        const options = this.generateOptions(smallSubtraction);
        return {
          question: `Resuelve la operación ${smallNum1} - ${smallNum2} de forma individual. ¿Cuál es el resultado?`,
          options,
          correctAnswer: smallSubtraction,
          explanation: `La respuesta correcta es ${smallNum1} - ${smallNum2} = ${smallSubtraction}. Este es un ejercicio para que lo resuelvas por ti mismo, enfocándote en la comprensión personal del proceso.`,
          difficulty,
          typeLabel: 'individual',
        };

      case 2:
        // Caso tipo 2: Resta con números medianos y enfoque individual
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSubtraction = mediumNum1 - mediumNum2;
        const options2 = this.generateOptions(mediumSubtraction);
        return {
          question: `Resuelve la operación ${mediumNum1} - ${mediumNum2} por ti mismo. ¿Cuál es el resultado?`,
          options: options2,
          correctAnswer: mediumSubtraction,
          explanation: `La respuesta correcta es ${mediumNum1} - ${mediumNum2} = ${mediumSubtraction}. Toma un momento para reflexionar sobre los pasos antes de dar una respuesta. Este ejercicio está diseñado para que trabajes de manera independiente.`,
          difficulty,
          typeLabel: 'individual',
        };

      case 3:
        // Caso tipo 3: Resta con números grandes y enfoque individual
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSubtraction = largeNum1 - largeNum2;
        const options3 = this.generateOptions(largeSubtraction);
        return {
          question: `Realiza la operación ${largeNum1} - ${largeNum2} por tu cuenta. ¿Cuál es el resultado?`,
          options: options3,
          correctAnswer: largeSubtraction,
          explanation: `El resultado correcto es ${largeNum1} - ${largeNum2} = ${largeSubtraction}. Este ejercicio está pensado para que pienses y resuelvas el problema de manera individual, sin la ayuda de otros.`,
          difficulty,
          typeLabel: 'individual',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje individual.');
    }
  }

  private generateSumKinestheticQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Uso de bloques físicos representados en la pregunta
        const maxBlocks = 5 * difficulty;
        const redBlocks = Math.floor(Math.random() * maxBlocks + 1);
        const blueBlocks = Math.floor(Math.random() * maxBlocks + 1);
        const correctAnswer = redBlocks + blueBlocks;
        const options = this.generateOptions(correctAnswer);
        return {
          question: `Imagina que tienes ${redBlocks} bloques rojos y ${blueBlocks} bloques azules. ¿Cuántos bloques tienes en total?`,
          instructions: `Si tienes acceso a bloques físicos o piezas, intenta representarlos y contarlos.`,
          items: { redBlocks, blueBlocks },
          options,
          correctAnswer,
          explanation: `Sumando los ${redBlocks} bloques rojos con los ${blueBlocks} bloques azules, obtienes un total de ${correctAnswer} bloques.`,
          difficulty,
          typeLabel: 'bloques_fisicos',
        };

      case 2:
        // Caso tipo 2: Movimiento y agrupación virtual o imaginativa
        const maxCoins = 10 * difficulty;
        const group1Coins = Math.floor(Math.random() * maxCoins + 1);
        const group2Coins = Math.floor(Math.random() * maxCoins + 1);
        const totalCoins = group1Coins + group2Coins;
        const options2 = this.generateOptions(totalCoins);
        return {
          question: `Tienes ${group1Coins} monedas en un grupo y ${group2Coins} en otro. Imagina o simula moverlas para contarlas todas. ¿Cuántas monedas tienes en total?`,
          instructions: `Puedes usar objetos cercanos como fichas, monedas o cuentas para representar cada grupo y sumarlas.`,
          groups: { group1Coins, group2Coins },
          options: options2,
          correctAnswer: totalCoins,
          explanation: `Sumando las monedas del grupo 1 (${group1Coins}) y el grupo 2 (${group2Coins}), tienes un total de ${totalCoins} monedas.`,
          difficulty,
          typeLabel: 'monedas_grupos',
        };

      case 3:
        // Caso tipo 3: Resolución a través de acciones físicas (como un minijuego)
        const totalSteps = 10 * difficulty;
        const step1 = Math.floor(Math.random() * totalSteps + 1);
        const step2 = Math.floor(Math.random() * totalSteps + 1);
        const correctSteps = step1 + step2;
        const options3 = this.generateOptions(correctSteps);
        return {
          question: `Da ${step1} pasos hacia adelante y luego ${step2} pasos más. ¿Cuántos pasos diste en total?`,
          instructions: `Realiza los pasos físicamente o simula la acción con movimientos.`,
          steps: { step1, step2 },
          options: options3,
          correctAnswer: correctSteps,
          explanation: `Al realizar ${step1} pasos y después ${step2}, habrás dado un total de ${correctSteps} pasos.`,
          difficulty,
          typeLabel: 'pasos_fisicos',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje kinestésico.');
    }
  }

  private generateSumReadingWritingQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Resolución a través de una historia breve
        const apples = Math.floor(Math.random() * (5 * difficulty) + 1);
        const oranges = Math.floor(Math.random() * (5 * difficulty) + 1);
        const correctAnswer = apples + oranges;
        const options = this.generateOptions(correctAnswer);
        return {
          question: `Lee la siguiente historia y responde: 
          María fue al mercado y compró ${apples} manzanas. Luego compró ${oranges} naranjas. 
          ¿Cuántas frutas compró en total?`,
          task: `Escribe los pasos para resolver la suma de ${apples} y ${oranges}.`,
          options,
          correctAnswer,
          explanation: `María compró ${apples} manzanas y ${oranges} naranjas. Sumándolas, el total es ${correctAnswer}.`,
          difficulty,
          typeLabel: 'historia',
        };

      case 2:
        // Caso tipo 2: Resolución usando instrucciones escritas
        const redPens = Math.floor(Math.random() * (10 * difficulty) + 1);
        const bluePens = Math.floor(Math.random() * (10 * difficulty) + 1);
        const totalPens = redPens + bluePens;
        const options2 = this.generateOptions(totalPens);
        return {
          question: `Sigue las instrucciones para resolver: 
          Escribe en una hoja cuántos bolígrafos rojos hay (${redPens}) y cuántos bolígrafos azules (${bluePens}). 
          Luego suma ambos números.`,
          task: `Escribe el cálculo de la suma y el resultado en una hoja.`,
          options: options2,
          correctAnswer: totalPens,
          explanation: `Los bolígrafos rojos son ${redPens} y los azules son ${bluePens}. Al sumarlos, tienes ${totalPens}.`,
          difficulty,
          typeLabel: 'instrucciones_escritas',
        };

      case 3:
        // Caso tipo 3: Redacción de un problema propio
        const num1 = Math.floor(Math.random() * (15 * difficulty) + 1);
        const num2 = Math.floor(Math.random() * (15 * difficulty) + 1);
        const sum = num1 + num2;
        const options3 = this.generateOptions(sum);
        return {
          question: `Escribe una historia breve que involucre sumar ${num1} y ${num2}. 
          Luego responde: ¿Cuál es el total?`,
          task: `Crea y resuelve una historia escrita que use los números ${num1} y ${num2}.`,
          options: options3,
          correctAnswer: sum,
          explanation: `El total es ${sum}, que resulta de sumar ${num1} y ${num2}.`,
          difficulty,
          typeLabel: 'redaccion_personal',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje de lectura/escritura.');
    }
  }

  private generateSumSequentialQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Pregunta secuencial con pasos definidos
        const number1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const number2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const sum1 = number1 + number2;
        const options = this.generateOptions(sum1);
        return {
          question: `Paso 1: Suma ${number1} + ${number2}. 
          Paso 2: Elige la respuesta correcta.`,
          task: `Primero, suma los dos números. Luego, selecciona la opción correcta.`,
          steps: [
            `Paso 1: ${number1} + ${number2}`,
            `Paso 2: Elige la opción correcta para el resultado.`,
          ],
          options,
          correctAnswer: sum1,
          explanation: `Para resolver la suma, comienza sumando ${number1} y ${number2}. El resultado es ${sum1}.`,
          difficulty,
          typeLabel: 'pasos_secuenciales',
        };

      case 2:
        // Caso tipo 2: Instrucción paso a paso más compleja
        const firstValue = Math.floor(Math.random() * (15 * difficulty) + 1);
        const secondValue = Math.floor(Math.random() * (15 * difficulty) + 1);
        const sum2 = firstValue + secondValue;
        const options2 = this.generateOptions(sum2);
        return {
          question: `Sigue estos pasos para resolver la suma:
          Paso 1: Escribe el primer número: ${firstValue}.
          Paso 2: Escribe el segundo número: ${secondValue}.
          Paso 3: Suma ambos números.`,
          task: `Escribe los números, sigue los pasos, y calcula la suma.`,
          steps: [
            `Paso 1: ${firstValue}`,
            `Paso 2: ${secondValue}`,
            `Paso 3: Suma ambos números.`,
          ],
          options: options2,
          correctAnswer: sum2,
          explanation: `Primero escribe ${firstValue}, luego ${secondValue}. La suma de estos dos números es ${sum2}.`,
          difficulty,
          typeLabel: 'instrucciones_paso_a_paso',
        };

      case 3:
        // Caso tipo 3: Pregunta con varios pasos de verificación
        const valueA = Math.floor(Math.random() * (20 * difficulty) + 1);
        const valueB = Math.floor(Math.random() * (20 * difficulty) + 1);
        const sum3 = valueA + valueB;
        const options3 = this.generateOptions(sum3);
        return {
          question: `Sigue estos pasos para verificar la suma de ${valueA} y ${valueB}:
          Paso 1: Escribe ${valueA}.
          Paso 2: Escribe ${valueB}.
          Paso 3: Verifica si la suma es correcta.`,
          task: `Primero, escribe los números. Luego, verifica si la suma es correcta.`,
          steps: [
            `Paso 1: Escribe el primer número: ${valueA}`,
            `Paso 2: Escribe el segundo número: ${valueB}`,
            `Paso 3: Verifica la suma entre ${valueA} y ${valueB}.`,
          ],
          options: options3,
          correctAnswer: sum3,
          explanation: `El primer número es ${valueA}, el segundo número es ${valueB}. La suma correcta es ${sum3}.`,
          difficulty,
          typeLabel: 'verificacion_paso_a_paso',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje secuencial.');
    }
  }

  private generateSumGlobalQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Pregunta global con enfoque holístico
        const num1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const num2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const totalSum = num1 + num2;
        const options = this.generateOptions(totalSum);
        return {
          question: `Imagina que estás en una tienda. Compraste productos por un valor de ${num1} y ${num2}. ¿Cuál es el total de tu compra?`,
          context: `Piensa en los valores como parte de un todo. ¿Qué cantidad total has gastado si los productos cuestan ${num1} y ${num2}?`,
          options,
          correctAnswer: totalSum,
          explanation: `Para calcular el total, debes sumar ${num1} y ${num2}. El resultado es ${totalSum}. Piensa en los dos números como partes de un todo que forman el valor total.`,
          difficulty,
          typeLabel: 'enfoque_global',
        };

      case 2:
        // Caso tipo 2: Pregunta global con énfasis en el contexto
        const firstValue = Math.floor(Math.random() * (25 * difficulty) + 1);
        const secondValue = Math.floor(Math.random() * (25 * difficulty) + 1);
        const globalSum = firstValue + secondValue;
        const options2 = this.generateOptions(globalSum);
        return {
          question: `En una fiesta, dos grupos de personas se están reuniendo. El primer grupo tiene ${firstValue} personas y el segundo grupo tiene ${secondValue}. ¿Cuántas personas hay en total en la fiesta?`,
          context: `Piensa en los grupos como partes de un total global. ¿Cuántas personas hay en total si sumamos los dos grupos?`,
          options: options2,
          correctAnswer: globalSum,
          explanation: `La suma de los dos grupos es ${firstValue} + ${secondValue}, lo que da como resultado ${globalSum}. Piensa en los dos grupos como componentes de un conjunto más grande.`,
          difficulty,
          typeLabel: 'enfoque_contextual',
        };

      case 3:
        // Caso tipo 3: Enfoque global en un escenario más amplio
        const valueA = Math.floor(Math.random() * (30 * difficulty) + 1);
        const valueB = Math.floor(Math.random() * (30 * difficulty) + 1);
        const sumResult = valueA + valueB;
        const options3 = this.generateOptions(sumResult);
        return {
          question: `En una granja, tienes ${valueA} manzanas y ${valueB} naranjas. ¿Cuántas frutas tienes en total?`,
          context: `Considera las manzanas y naranjas como parte de una cantidad global de frutas. ¿Cuál es el total si las sumas?`,
          options: options3,
          correctAnswer: sumResult,
          explanation: `El total de frutas es ${valueA} manzanas más ${valueB} naranjas, lo que da ${sumResult} frutas en total. Piensa en las frutas como parte de un conjunto más amplio.`,
          difficulty,
          typeLabel: 'enfoque_global',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje global.');
    }
  }


  private generateOptions(correctAnswer: number): number[] {
    const options = new Set<number>([correctAnswer]);
    while (options.size < 4) {
      options.add(correctAnswer + Math.floor(Math.random() * 20 - 10));
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  private generateSumActiveQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Actividad práctica con enfoque activo
        const num1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const num2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const totalSum = num1 + num2;
        const options = this.generateOptions(totalSum);
        return {
          question: `¡Es hora de actuar! Imagina que tienes ${num1} fichas y luego compras ${num2} más. ¿Cuántas fichas tienes ahora?`,
          activity: `Toma ${num1} fichas y luego agrega ${num2} más. Cuenta el total. ¿Cuántas tienes en total?`,
          options,
          correctAnswer: totalSum,
          explanation: `La suma es ${num1} + ${num2}, lo que da como resultado ${totalSum}. Es importante sumar las fichas físicamente para visualizar el proceso.`,
          difficulty,
          typeLabel: 'actividad_activa',
        };

      case 2:
        // Caso tipo 2: Actividad práctica para una suma más grande
        const firstValue = Math.floor(Math.random() * (15 * difficulty) + 1);
        const secondValue = Math.floor(Math.random() * (15 * difficulty) + 1);
        const sumResult = firstValue + secondValue;
        const options2 = this.generateOptions(sumResult);
        return {
          question: `¡Participa activamente! Tienes ${firstValue} monedas y luego ganas ${secondValue} más en un juego. ¿Cuántas monedas tienes en total?`,
          activity: `Usa monedas de diferentes colores para representar ${firstValue} y ${secondValue}. Luego, suma todas las monedas. ¿Cuántas tienes al final?`,
          options: options2,
          correctAnswer: sumResult,
          explanation: `La suma es ${firstValue} + ${secondValue} monedas, lo que da como resultado ${sumResult}. Contar las monedas físicamente ayuda a visualizar el proceso de suma.`,
          difficulty,
          typeLabel: 'actividad_activa',
        };

      case 3:
        // Caso tipo 3: Suma en un escenario práctico
        const valueA = Math.floor(Math.random() * (20 * difficulty) + 1);
        const valueB = Math.floor(Math.random() * (20 * difficulty) + 1);
        const total = valueA + valueB;
        const options3 = this.generateOptions(total);
        return {
          question: `¡Es momento de resolver! En una carrera, un corredor avanza ${valueA} metros en el primer tramo y ${valueB} metros en el segundo tramo. ¿Cuántos metros ha avanzado en total?`,
          activity: `Usa una cinta métrica o dibuja el recorrido para sumar los tramos: ${valueA} metros y ${valueB} metros. ¿Cuántos metros avanzó en total?`,
          options: options3,
          correctAnswer: total,
          explanation: `La suma de los tramos es ${valueA} + ${valueB} metros, lo que da como resultado ${total}. Visualizar el recorrido ayuda a entender la relación entre las partes y el total.`,
          difficulty,
          typeLabel: 'actividad_practica',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje activo.');
    }
  }

  private generateSumReflectiveQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Reflexión sobre la suma de números pequeños
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSum = smallNum1 + smallNum2;
        const options = this.generateOptions(smallSum);
        return {
          question: `Reflexiona sobre el siguiente problema: Si tienes ${smallNum1} manzanas y compras ${smallNum2} más, ¿cuántas manzanas tienes en total? Piensa en los pasos que seguiste para llegar a la respuesta.`,
          reflectionPrompt: `¿Cómo llegaste a la respuesta? ¿Qué estrategia utilizaste para sumar las manzanas? Reflexiona sobre el proceso que seguiste para resolver el problema.`,
          options,
          correctAnswer: smallSum,
          explanation: `La respuesta correcta es ${smallNum1} + ${smallNum2} = ${smallSum}. Reflexionar sobre cómo llegamos a la respuesta nos ayuda a entender mejor cómo funciona la suma y cómo resolver problemas similares en el futuro.`,
          difficulty,
          typeLabel: 'reflexiva',
        };

      case 2:
        // Caso tipo 2: Reflexión sobre la suma con números más grandes
        const bigNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const bigNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const bigSum = bigNum1 + bigNum2;
        const options2 = this.generateOptions(bigSum);
        return {
          question: `Reflexiona sobre el siguiente problema: Si tienes ${bigNum1} monedas y luego compras ${bigNum2} más, ¿cuántas monedas tienes en total? Piensa en cómo resolviste este problema. ¿Hubo algo que te resultó difícil al sumarlas?`,
          reflectionPrompt: `Piensa en el proceso que seguiste para resolver la suma. ¿Te encontraste con algún obstáculo? ¿Cómo lo superaste? Reflexiona sobre los pasos que seguiste y cómo mejorarías tu enfoque la próxima vez.`,
          options: options2,
          correctAnswer: bigSum,
          explanation: `La suma de ${bigNum1} y ${bigNum2} es ${bigSum}. Reflexionar sobre el proceso nos ayuda a identificar si seguimos una estrategia efectiva y si hay formas de hacerlo más rápido o de manera más eficiente.`,
          difficulty,
          typeLabel: 'reflexiva',
        };

      case 3:
        // Caso tipo 3: Reflexión sobre la suma de cantidades grandes
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSum = largeNum1 + largeNum2;
        const options3 = this.generateOptions(largeSum);
        return {
          question: `Reflexiona sobre este problema más desafiante: Si tienes ${largeNum1} dólares y luego recibes ${largeNum2} más, ¿cuánto dinero tienes en total? Piensa en cómo desglosaste los números para sumar de manera más efectiva.`,
          reflectionPrompt: `Al resolver este problema, ¿cómo dividiste las cantidades en pasos más pequeños? Reflexiona sobre cómo los enfoques más metódicos pueden hacer que la suma de números grandes sea más fácil y rápida.`,
          options: options3,
          correctAnswer: largeSum,
          explanation: `La suma de ${largeNum1} y ${largeNum2} es ${largeSum}. Al reflexionar sobre el proceso, podemos identificar qué técnicas de suma ayudan a manejar cantidades más grandes con mayor facilidad y confianza.`,
          difficulty,
          typeLabel: 'reflexiva',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje reflexivo.');
    }
  }

  private generateSumSocialQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Suma con colaboración en grupo
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSum = smallNum1 + smallNum2;
        const options = this.generateOptions(smallSum);
        return {
          question: `En grupo, resuelvan este problema: Si uno de ustedes tiene ${smallNum1} manzanas y otro tiene ${smallNum2}, ¿cuántas manzanas tienen en total? Piensen juntos en cómo abordar este problema y lleguen a una respuesta en grupo.`,
          socialPrompt: `Discutan en grupo: ¿cómo podemos representar esta suma de una manera que todos entiendan? ¿Cuál es el proceso que seguimos para encontrar la respuesta?`,
          options,
          correctAnswer: smallSum,
          explanation: `La respuesta correcta es ${smallNum1} + ${smallNum2} = ${smallSum}. Trabajar en grupo ayuda a compartir estrategias y aprender de los demás mientras se resuelven problemas juntos.`,
          difficulty,
          typeLabel: 'social',
        };

      case 2:
        // Caso tipo 2: Suma con números más grandes y colaboración
        const bigNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const bigNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const bigSum = bigNum1 + bigNum2;
        const options2 = this.generateOptions(bigSum);
        return {
          question: `En equipo, resuelvan este problema: Si un miembro del equipo tiene ${bigNum1} monedas y otro tiene ${bigNum2}, ¿cuántas monedas tienen en total? Piensen en cómo resolverlo de manera efectiva como equipo.`,
          socialPrompt: `En su discusión grupal, ¿cómo organizan las ideas para sumar? ¿Alguien tiene una estrategia particular para sumar rápidamente? Discutan cómo sus enfoques pueden mejorar cuando trabajan juntos.`,
          options: options2,
          correctAnswer: bigSum,
          explanation: `La suma de ${bigNum1} y ${bigNum2} es ${bigSum}. Resolver este problema en equipo permite aprender de las diferentes formas de abordar una misma situación y mejorar el entendimiento colectivo.`,
          difficulty,
          typeLabel: 'social',
        };

      case 3:
        // Caso tipo 3: Suma de cantidades grandes con trabajo en equipo
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSum = largeNum1 + largeNum2;
        const options3 = this.generateOptions(largeSum);
        return {
          question: `Como equipo, resuelvan este desafío: Si un miembro del equipo tiene ${largeNum1} dólares y otro tiene ${largeNum2}, ¿cuánto dinero tienen en total? Piensen juntos en el proceso y colaboren para encontrar la solución.`,
          socialPrompt: `Al resolver este problema en equipo, ¿cómo se distribuyen las tareas? ¿Alguien se encarga de sumar los números y otro de verificar la respuesta? Reflexionen sobre cómo el trabajo en equipo facilita la resolución de problemas complejos.`,
          options: options3,
          correctAnswer: largeSum,
          explanation: `La suma de ${largeNum1} y ${largeNum2} es ${largeSum}. Resolver problemas en equipo fomenta la colaboración y permite que cada miembro aporte su perspectiva y habilidades al proceso de resolución.`,
          difficulty,
          typeLabel: 'social',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje social.');
    }
  }

  private generateSumIndividualQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Suma con números pequeños para resolver de forma independiente
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSum = smallNum1 + smallNum2;
        const options = this.generateOptions(smallSum);
        return {
          question: `Resuelve esta suma de forma individual: ¿Cuál es el resultado de ${smallNum1} + ${smallNum2}?`,
          options,
          correctAnswer: smallSum,
          explanation: `La respuesta correcta es ${smallNum1} + ${smallNum2} = ${smallSum}. Responder preguntas de forma individual ayuda a mejorar la concentración y la comprensión personal.`,
          difficulty,
          typeLabel: 'individual',
        };

      case 2:
        // Caso tipo 2: Suma con números medianos para fomentar el trabajo independiente
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSum = mediumNum1 + mediumNum2;
        const options2 = this.generateOptions(mediumSum);
        return {
          question: `Resuelve esta suma: ¿Cuál es el resultado de ${mediumNum1} + ${mediumNum2}? Tómate tu tiempo para hacerlo solo/a.`,
          options: options2,
          correctAnswer: mediumSum,
          explanation: `La respuesta correcta es ${mediumNum1} + ${mediumNum2} = ${mediumSum}. Trabajar solo/a permite enfocarse en resolver problemas sin distracciones.`,
          difficulty,
          typeLabel: 'individual',
        };

      case 3:
        // Caso tipo 3: Suma de números grandes para evaluación individual avanzada
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSum = largeNum1 + largeNum2;
        const options3 = this.generateOptions(largeSum);
        return {
          question: `Resuelve esta suma avanzada: ¿Cuál es el resultado de ${largeNum1} + ${largeNum2}? Este problema requiere que trabajes de forma independiente.`,
          options: options3,
          correctAnswer: largeSum,
          explanation: `La respuesta correcta es ${largeNum1} + ${largeNum2} = ${largeSum}. Al resolver este problema por ti mismo/a, puedes desarrollar un entendimiento más profundo y fortalecer tu confianza en las matemáticas.`,
          difficulty,
          typeLabel: 'individual',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje individual.');
    }
  }

  private generateSumAuditoryQuestion(type: number, difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): any {
    
    const difficulty = this.calculateDifficulty(difficultyWeights);

    switch (type) {
      case 1:
        // Caso tipo 1: Suma simple con números pequeños, ideal para aprender por medio de la escucha
        const smallNum1 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallNum2 = Math.floor(Math.random() * (10 * difficulty) + 1);
        const smallSum = smallNum1 + smallNum2;
        const options = this.generateOptions(smallSum);
        return {
          question: `Escucha bien: ¿Cuál es el resultado de sumar ${smallNum1} y ${smallNum2}?`,
          audio: `audio/suma_simple_${smallNum1}_${smallNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options,
          correctAnswer: smallSum,
          explanation: `La respuesta correcta es ${smallNum1} + ${smallNum2} = ${smallSum}. Para los estudiantes auditivos, escuchar la operación puede ayudar a reforzar la memoria y la comprensión.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      case 2:
        // Caso tipo 2: Suma con números medianos
        const mediumNum1 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumNum2 = Math.floor(Math.random() * (20 * difficulty) + 1);
        const mediumSum = mediumNum1 + mediumNum2;
        const options2 = this.generateOptions(mediumSum);
        return {
          question: `Escucha cuidadosamente: ¿Cuál es el resultado de sumar ${mediumNum1} y ${mediumNum2}?`,
          audio: `audio/suma_moderada_${mediumNum1}_${mediumNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options: options2,
          correctAnswer: mediumSum,
          explanation: `La respuesta correcta es ${mediumNum1} + ${mediumNum2} = ${mediumSum}. La repetición auditiva de la suma puede ayudar a los estudiantes auditivos a memorizar la operación y sus resultados.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      case 3:
        // Caso tipo 3: Suma de números grandes para estudiantes que aprenden mejor al escuchar
        const largeNum1 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeNum2 = Math.floor(Math.random() * (30 * difficulty) + 1);
        const largeSum = largeNum1 + largeNum2;
        const options3 = this.generateOptions(largeSum);
        return {
          question: `Escucha bien esta vez: ¿Cuál es el resultado de sumar ${largeNum1} y ${largeNum2}?`,
          audio: `audio/suma_grande_${largeNum1}_${largeNum2}.mp3`,  // Ruta al archivo de audio correspondiente
          options: options3,
          correctAnswer: largeSum,
          explanation: `La respuesta correcta es ${largeNum1} + ${largeNum2} = ${largeSum}. Al escuchar las operaciones y los números, los estudiantes auditivos pueden internalizar mejor los procesos matemáticos.`,
          difficulty,
          typeLabel: 'auditivo',
        };

      default:
        throw new NotFoundException('Tipo de pregunta no soportado para aprendizaje auditivo.');
    }
  }

  

  private generateRandomCoordinates(count: number): { x: number; y: number }[] {
    return Array.from({ length: count }, () => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    }));
  }

   // Función para calcular la dificultad basada en los pesos de dificultad
   public calculateDifficulty(difficultyWeights: { 
    preguntas_faciles: number, 
    preguntas_intermedias: number, 
    preguntas_dificiles: number, 
    conocimiento_total: number, 
    peso_dificultad: number[] 
  }): number {
    const [pesoFacil, pesoIntermedio, pesoDificil] = difficultyWeights.peso_dificultad;

    const totalWeight = pesoFacil + pesoIntermedio + pesoDificil;
    const random = Math.random() * totalWeight;

    let difficulty;
    if (random < pesoFacil) {
      difficulty = 1;  // Dificultad fácil
    } else if (random < pesoFacil + pesoIntermedio) {
      difficulty = 2;  // Dificultad media
    } else {
      difficulty = 3;  // Dificultad difícil
    }

    return difficulty;
  }
}