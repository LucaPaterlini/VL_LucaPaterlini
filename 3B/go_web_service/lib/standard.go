package lib

func reverseInts(input []int) []int {
	if len(input) == 0 {return input}
	return append(reverseInts(input[1:]), input[0])
}

func reverseIntsItems(input [][]int) [][]int {
	if len(input) == 0 {return input}
	return append(reverseIntsItems(input[1:]), input[0])
}

func searchIndexInt(item int, array []int)int{
	for k,v := range array{
		if v==item {return k}
	}
	return -1
}

func searchIndexString(array string, item string)int{
	for i:=0;i<len(array);i++{
		if string(array[i])==item {return i}
	}
	return -1
}


func absInt(a int)int {
	if a>0 {return a}
	return -a
}

func Map(vs []string, f func(string) string) []string {
	vsm := make([]string, len(vs))
	for i, v := range vs {
		vsm[i] = f(v)
	}
	return vsm
}
