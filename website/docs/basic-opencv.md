---
title: Basale operationer i OpenCV
---

## Læs, vis og skriv billeder

For at læse et billede ind i OpenCV bruger vi funktionen `imread`. Den tager en sti til et billede som input, og returnerer et billede i OpenCV's egen datatype `Mat`. For at skrive et billede til disk bruger vi funktionen `imwrite`. Den tager en sti til hvor billedet skal gemmes, samt et billede som input.
For at vise et billede på skærmen bruger vi funktionen `imshow`. Den tager et navn til vinduet, samt et billede som input. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg");       // Read the file from disk
imshow("Lena", image);                          // Show the image
waitKey(0);                                     // Wait for keypress
imwrite("C:/images/lena_copy.jpg", image);      // Write the image to disk
```

## Gråtonebilleder

Et billede i OpenCV er en 2-dimensionel matrix, hvor hver pixel indeholder intensitet.

Et gråtonebillede er et billede hvor hver pixel kun indeholder en intensitet. Det kan vi lave ved at konvertere billedet til gråtone med funktionen `cvtColor`. Den tager et billede som input, samt en konverteringskode. For at konvertere til gråtone bruger vi `COLOR_BGR2GRAY`. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg");       // Read the file from disk
Mat grayImage;                                  // Create a new empty image
cvtColor(image, grayImage, COLOR_BGR2GRAY);     // Convert to grayscale
imshow("Lena", grayImage);                      // Show the image
waitKey(0);                                     // Wait for keypress
imwrite("C:/images/lena_gray.jpg", grayImage);  // Write the image to disk
```

## Konvertering mellem farverum

Vi kan konvertere mellem farverum med funktionen `cvtColor`. Den tager et billede som input, samt en konverteringskode. For at konvertere til gråtone bruger vi `COLOR_BGR2GRAY`. For at konvertere til HSV bruger vi `COLOR_BGR2HSV`. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg");       // Read the file from disk
Mat hsvImage;                                   // Create a new empty image
cvtColor(image, hsvImage, COLOR_BGR2HSV);       // Convert to HSV
imshow("Lena", hsvImage);                       // Show the image
waitKey(0);                                     // Wait for keypress
imwrite("C:/images/lena_hsv.jpg", hsvImage);    // Write the image to disk
```
Vi kan også konvertere tilbage til BGR med `COLOR_HSV2BGR`, fra BGR til RGB med `COLOR_BGR2RGB`.

## Histogrammer

Til gråtonebilleder kan at histogram defineres som en funktion der tæller antallet af pixels med en given intensitet. Histogrammet kan bruges til at analysere billedet, f.eks. til at finde ud af om billedet er mørkt eller lyst, eller om billedet er kontrastfuldt eller ej. Eller om der er spikes i lyse eller mørke områder, som kan være tegn på over- eller undereksponering.

Vi kan lave et histogram med funktionen `calcHist`. Den tager et billede som input. For at lave et histogram over intensiteterne i et gråtonebillede bruger vi følgende kode:

```cpp
Mat histogram_gray(Mat src) {
	int histSize = 256;
	float range[] = { 0, 256 };
	const float* histRange[] = { range };
	bool uniform = true, accumulate = false;
	int hist_w = 512, hist_h = 400;
	int bin_w = cvRound((double)hist_w / histSize);
	Mat histImage(hist_h, hist_w, CV_8UC3, Scalar(0, 0, 0));

	Mat hist;
	calcHist(&src, 1, 0, Mat(), hist, 1, &histSize, histRange, uniform, accumulate);
	normalize(hist, hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());

	for (int i = 1; i < histSize; i++)
	{
		line(histImage, Point(bin_w * (i - 1), hist_h - cvRound(hist.at<float>(i - 1))),
			Point(bin_w * (i), hist_h - cvRound(hist.at<float>(i))),
			Scalar(255, 0, 0), 2, 8, 0);
	}
	return histImage;
}

For histogrammer på farvebilleder kan vi bruge følgende kode:

```cpp
Mat histogram_color(Mat src) {
    vector<Mat> bgr_planes;

    split(src, bgr_planes);

    int histSize = 256;
    float range[] = { 0, 256 }; //the upper boundary is exclusive
    const float* histRange[] = { range };
    bool uniform = true, accumulate = false;
    Mat b_hist, g_hist, r_hist;

    calcHist(&bgr_planes[0], 1, 0, Mat(), b_hist, 1, &histSize, histRange, uniform, accumulate);
    calcHist(&bgr_planes[1], 1, 0, Mat(), g_hist, 1, &histSize, histRange, uniform, accumulate);
    calcHist(&bgr_planes[2], 1, 0, Mat(), r_hist, 1, &histSize, histRange, uniform, accumulate);

    int hist_w = 512, hist_h = 400;
    int bin_w = cvRound((double)hist_w / histSize);
    Mat histImage(hist_h, hist_w, CV_8UC3, Scalar(0, 0, 0));

    normalize(b_hist, b_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());
    normalize(g_hist, g_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());
    normalize(r_hist, r_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());

    for (int i = 1; i < histSize; i++)
    {
        line(histImage, Point(bin_w * (i - 1), hist_h - cvRound(b_hist.at<float>(i - 1))),
            Point(bin_w * (i), hist_h - cvRound(b_hist.at<float>(i))),
            Scalar(255, 0, 0), 2, 8, 0);
        line(histImage, Point(bin_w * (i - 1), hist_h - cvRound(g_hist.at<float>(i - 1))),
            Point(bin_w * (i), hist_h - cvRound(g_hist.at<float>(i))),
            Scalar(0, 255, 0), 2, 8, 0);
        line(histImage, Point(bin_w * (i - 1), hist_h - cvRound(r_hist.at<float>(i - 1))),
            Point(bin_w * (i), hist_h - cvRound(r_hist.at<float>(i))),
            Scalar(0, 0, 255), 2, 8, 0);
    }
    return histImage;
}
```