(() => {
  const bubbleSort = () => {
    console.log('**********Bubble Sort***********');
    const arr = [64, 34, 25, 12, 22, 11, 90];
    let temp;
    let swapped;
    for (let i = 0; i < arr.length; i++) {
      swapped = false;
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          /*  temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp; */
          swapped = true;
        }
      }

      if (!swapped) break;
    }

    console.log(arr);
    console.log('*********************');
  };
  const insertionSort = () => {
    console.log('**********Insertion Sort ***********');
    const arr = [64, 34, 25, 12, 22, 11, 90, 1, 106, 78];

    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;

      while (arr[j] > current && j >= 0) {
        arr[j + 1] = arr[j];
        j--;
      }
      console.log(j);
      arr[j + 1] = current;
    }
    console.log(arr);
    console.log('*********************');
  };
  const selectionSort = () => {
    console.log('**********Selection Sort ***********');
    const arr = [64, 34, 25, 12, 22, 11, 90, 1, 106, 78];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      let temp = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
    console.log(arr);
    console.log('*********************');
  };
  const mergeSortFuncGpt = (arr) => {
    return mergeSort(arr);
    function mergeSort(arr) {
      // Caso base: se o array tiver 1 ou 0 elementos, já está ordenado
      if (arr.length <= 1) {
        return arr;
      }

      // Encontra o meio do array
      const middle = Math.floor(arr.length / 2);

      // Divide o array em duas metades
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
      // Ordena cada metade e depois faz o merge
      return merge(mergeSort(left), mergeSort(right));
    }

    // Função que junta duas metades ordenadas
    function merge(left, right) {
      let result = [];
      let i = 0;
      let j = 0;
      // Compara os elementos das duas metades
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      // Concatena os elementos restantes (se houver)
      return result.concat(left.slice(i)).concat(right.slice(j));
    }
  };
  const mergeSortFuncPropria = (arr) => {
    const mergeSort = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
      let middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
      return merge(mergeSort(left), mergeSort(right));
    };

    const merge = (left, right) => {
      let result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      const remaining = left.slice(i).concat(right.slice(j));
      return result.concat(remaining);
    };
    return mergeSort(arr);
  };
  const jump = function (nums) {
    let jumps = 0; // contador de saltos
    let currentEnd = 0; // limite da camada atual
    let farthest = 0; // ponto mais distante que consigo alcançar

    for (let i = 0; i < nums.length - 1; i++) {
      // Atualiza o ponto mais distante possível
      farthest = Math.max(farthest, i + nums[i]);

      // Se chegamos no limite da camada atual
      if (i === currentEnd) {
        jumps++; // precisamos de mais um salto
        currentEnd = farthest; // define o novo limite
      }
      console.log(nums[i]);
    }
    return jumps;
  };

  // console.log(jump([2, 0, 3, 1, 1, 4]));

  const nextGreaterElement = (nums) => {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < nums.length; i++) {
      while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
        const idx = stack.pop();
        result[idx] = nums[i];
      }

      stack.push(i);
    }
    console.log(result);
  };
  console.log([3, 0, 6, 1, 5].sort((a, b) => b - a));
})();

/* function nextGreaterElement(nums) {
  nums = [2,1,2,4,3]
  const n = nums.length;
  const result = new Array(n).fill(-1); 
  const stack = []; // vai guardar os índices

  for (let i = 0; i < n; i++) {
    // Enquanto o elemento atual for MAIOR que o topo da pilha
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i]; // nums[i] é o "next greater" para nums[idx]
    }
    stack.push(i); // adiciona índice atual
  }

  return result;
} */
[];
