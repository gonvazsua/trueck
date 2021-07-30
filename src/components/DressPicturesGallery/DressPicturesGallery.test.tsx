import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {DressPicture} from "../../api/dress/dressAPI";
import {createMemoryHistory} from "history";
import React from "react";
import DressPicturesGallery from "./DressPicturesGallery";

describe('DressForGrid test', () => {

    const history = createMemoryHistory();

    const renderComponent = (dressPictures: DressPicture[]) => {
        return render(
            <DressPicturesGallery dressPictures={dressPictures}/>
        );
    };

    test('Should render main picture from the beginning', async () => {

        const dressPictures: DressPicture[] = [
            {url:'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg', main:false},
            {url:'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-2.jpeg', main:true}
        ];

        renderComponent(dressPictures);

        expect(screen.getByTestId('DressPicturesGallery-mainPicture')).toHaveAttribute('src', 'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-2.jpeg');
    });

    test('should render selected picture when clicking on it', async () => {
        const dressPicture1: DressPicture = {url:'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg', main:false, name: 'Picture1'};
        const dressPicture2: DressPicture = {url:'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-2.jpeg', main:true, name: 'Picture2'};
        const dressPictures: DressPicture[] = [
            dressPicture1,
            dressPicture2
        ];

        renderComponent(dressPictures);

        act(() => {
             fireEvent.click(screen.getByTestId('DressPicturesGallery-picture-' + dressPicture1.name));
        });

        await waitFor(() => expect(screen.getByTestId('DressPicturesGallery-mainPicture')).toHaveAttribute('src', 'https://borow.es/wp-content/uploads/2021/04/Alice-Olicia-vestido-tirantes-midi-rojo-azul-1.jpeg'));
    });

});